"use strict";
const cache = {};

export function memoized(key) {
  return cache[key] !== undefined;
}
// TODO: this function is now doing too much.  It should not massage the data, but just return it.
// This needs to be done in each specific class (if possible)
export function memoizeJSON() {
  let args = arguments;
  let key = args[0].key;
  let fn = args[0].fn;
  if (!cache[key]) {
    cache[key] = fn().then(data => {
      return data.json().then(data => {
        if (data.rows) {
          return {
            rows: data.rows,
            columns: data.columns,
            data: normalizeFusionResponse(data)
          };
        }
        // spotify backups
        else if (data.artists || data.tracks || data.items) {
          return { spotify: normalizeSpotifyResponse(data) };
        } else if (data) {
          return data;
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

export function normalizeFusionResponse(data) {
  let json = [];
  const rows = data.rows;
  const columns = data.columns;

  for (var y = 0; y < rows.length; y++) {
    let obj = {};
    for (var i = 0; i < columns.length; i++) {
      obj[columns[i]] = rows[y][i];
    }
    json.push(obj);
  }

  return json;
}

export function normalizeSpotifyResponse(data) {
  var json = [];
  if (data && data.artists && data.artists.items) {
    data.artists.items.forEach(item => {
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
    data.artists.forEach(item => {
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
    data.items.forEach(item => {
      var obj = {
        albumsName: item.name,
        albumsId: item.id,
        albumsImagesUrl: item.images[0] ? item.images[0].url : "",
        Sid: item.id
      };
      json.push(obj);
    });
  } else if (data && data.tracks) {
    data.tracks.forEach(item => {
      var obj = {
        topTracksAlbumId: item.album.id,
        topTracksAlbumName: item.album.name,
        topTracksAlbumImagesUrl: item.album.images[0]
          ? item.album.images[0].url
          : "",
        topTracksAlbumReleaseDate: item.album.release_date,
        topTracksName: item.name,
        topTracksId: item.id
      };
      json.push(obj);
    });
  }
  return json;
}
