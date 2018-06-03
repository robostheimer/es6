'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoized = memoized;
exports.memoizeJSON = memoizeJSON;
exports.normalizeFusionResponse = normalizeFusionResponse;
exports.normalizeSpotifyResponse = normalizeSpotifyResponse;
var cache = {};

function memoized(key) {
  return cache[key] !== undefined;
}

function memoizeJSON() {
  var args = arguments;
  var key = args[0].key;
  var fn = args[0].fn;
  if (!cache[key]) {
    cache[key] = fn().then(function (data) {
      return data.json().then(function (data) {
        if (data.rows) {
          return { rows: data.rows, columns: data.columns, data: normalizeFusionResponse(data) };
        } else if (!data.error) {
          return { spotify: normalizeSpotifyResponse(data) };
        }
        // if error remove key from the cache;
        else {
            delete cache[key];
          }
        return data;
      });
    });
  }
  return cache[key];
}

function normalizeFusionResponse(data) {
  var json = [];
  var rows = data.rows;
  var columns = data.columns;

  for (var y = 0; y < rows.length; y++) {
    var obj = {};
    for (var i = 0; i < columns.length; i++) {
      obj[columns[i]] = rows[y][i];
    }
    json.push(obj);
  }

  return json;
}

function normalizeSpotifyResponse(data) {
  var json = [];
  if (data && data.artists && data.artists.items) {
    data.artists.items.forEach(function (item) {
      var obj = {
        Name: item.name,
        popularity: item.popularity,
        artistsImagesUrl: item.images[0] ? item.images[0].url : "",
        Sid: item.id,
        artistsFollowersTotal: item.followers.total,
        genres: item.genres
      };
      json.push(obj);
    });
  } else if (data && data.artists) {
    data.artists.forEach(function (item) {
      var obj = {
        relatedName: item.name,
        relatedPopularity: item.popularity,
        relatedImagesUrl: item.images[0] ? item.images[0].url : "",
        Sid: item.id,
        relatedFollowersTotal: item.followers.total
      };
      json.push(obj);
    });
  } else if (data && data.items) {
    data.items.forEach(function (item) {
      var obj = {
        albumsName: item.name,
        albumsId: item.id,
        albumsImagesUrl: item.images[0] ? item.images[0].url : "",
        Sid: item.id
      };
      json.push(obj);
    });
  } else if (data && data.tracks) {
    data.tracks.forEach(function (item) {
      var obj = {
        topTracksAlbumId: item.album.id,
        topTracksAlbumName: item.album.name,
        topTracksAlbumImagesUrl: item.album.images[0] ? item.album.images[0].url : "",
        topTracksAlbumReleaseDate: item.album.release_date,
        topTracksName: item.name,
        topTracksId: item.id
      };
      json.push(obj);
    });
  }
  return json;
}