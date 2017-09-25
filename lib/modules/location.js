'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _memoize = require('../helpers/memoize');

var _addToStorage = require('../helpers/add-to-storage');

var _artist = require('./artist');

var _artist2 = _interopRequireDefault(_artist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var artist = new _artist2.default();

//TODO: Need to add album and track class/components to support linking.

var Location = function () {
  function Location() {
    _classCallCheck(this, Location);
  }

  _createClass(Location, [{
    key: 'fetchCityArtists',
    value: function fetchCityArtists(lat_lng_ratio) {
      if (lat_lng_ratio) {
        var splitter = lat_lng_ratio.split(',');
        var lat = splitter[0].slice(0, 5);
        var lng = splitter[1].slice(0, 5);
        var ratio = 0.5;
        var min_lat = parseFloat(lat) - ratio;
        var max_lat = parseFloat(lat) + ratio;
        var min_lng = parseFloat(lng) - ratio;
        var max_lng = parseFloat(lng) + ratio;
        var url = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT+City%2C+Name%2C+ArtistId%2CHotness+FROM+15UlsGab9-IJ7Hq4ypRYiQMWd2QkGaywgs2WMUuTJ+WHERE+Lat+<=' + max_lat + '+AND+Lat>=' + min_lat + '+AND+Lng<=' + max_lng + '+AND+Lng>=' + min_lng + '+ORDER+BY+%27Hotness%27+DESC+Limit+50&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

        var data = (0, _memoize.memoizeJSON)({ key: lat_lng_ratio,
          fn: function fn() {
            return fetch(url);
          }
        });
        (0, _addToStorage.addToStorage)('hash', '/city/' + lat_lng_ratio);
        return data;
      }
    }
  }, {
    key: 'createCityArtistsDOM',
    value: function createCityArtistsDOM(data) {
      this.fetchArtistsFromSpotify(data);
      //artist.createArtistDom('test');
    }
  }, {
    key: 'fetchArtistsFromSpotify',
    value: function fetchArtistsFromSpotify(data) {
      console.log(data.rows);
      if (data.rows) {
        var artists = data.rows.reduce(function (artistsArr, artist) {
          artistsArr.push({
            location: artist[0],
            artist: artist[1],
            id: artist[2],
            hotness: artist[3]
          });
          return artistsArr;
        }, []);
        console.log(artists);
      }
    }
    // fetchCity(lat, lng, ratio) {
    //   const url = `https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+CityName%2C+Region%2C+CountryID+FROM+1B8NpmfiAc414JhWeVZcSqiz4coLc_OeIh7umUDGs+WHERE+Lat+%3C=${lat+ratio}+AND+Lat%3E=${lat - ratio}+AND+Long%3C=${lng + ratio}+AND+Long%3E=${lng - ratio}&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&sortby=Hotttness`;
    //   if(lat && lng && ratio) {
    //     var data =  memoizeJSON({key: `geolocation_${lat}_${lng}`,
    //       fn() {
    //         return fetch(url);
    //       }
    //     });
    //     return data;
    //   }
    // }

    // fetchArtistsFromLocation() {

    // }

    // fetchTopTracks(id) {
    //   const request = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`
    //
    //   if(id) {
    //     var data =  memoizeJSON({key: `top_${id}`,
    //       fn() {
    //         return fetch(request, {
    //           headers: auth_header
    //         });
    //       }
    //     });
    //     addToStorage('hash', `top_${id}`);
    //     return data;
    //   }
    // }
    //
    // fetchAlbums(id) {
    //   const request = `https://api.spotify.com/v1/artists/${id}/albums`;
    //
    //   if(id) {
    //     var data =  memoizeJSON({key: `albums_${id}`,
    //       fn() {
    //         return fetch(request, {
    //           headers: auth_header
    //         });
    //       }
    //     });
    //     addToStorage('hash', `/albums_${id}`);
    //     return data;
    //   }
    // }
    //
    // fetchRecommendations(id) {
    //   const request = `https://api.spotify.com/v1/recommendations?seed_artists=${id}&limit=50`;
    //
    //   if(id) {
    //     var data =  memoizeJSON({key: `recs_${id}`,
    //       fn() {
    //         return fetch(request, {
    //           headers: auth_header
    //         });
    //       }
    //     });
    //     addToStorage('hash', `recommendations_${id}`);
    //     return data;
    //   }
    // }
    //
    // //TODO: Try to think about how to abstract this to use for all situations of creating dom
    // //perhaps a recursive function of
    // createArtistDom(data) {//, params) {
    //   $('#/artists').remove();
    //   //const action = params.action;
    //   const dom = escapeTemplate`
    //     <ul id="artists" class="cards">
    //       ${each({
    //         data: data.artists.items,
    //         tag: 'li',
    //         txt: `<div>
    //                 <strong>{{name}}</strong>
    //               </div>
    //               <ul class="options">
    //                 <li>
    //                   <a href="#/related_{{id}}">
    //                     Related Musicians
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#/top_{{id}}">
    //                     Top Tracks
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#/albums_{{id}}">
    //                     Albums
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#/recommendations_{{id}}">
    //                     Create Radio Station
    //                   </a>
    //                 <li>
    //                 <li>
    //                   <a>
    //                     Other musicians from {{location}}
    //                   </a>
    //                 </li>
    //               </ul>
    //               `,
    //         attrs: {
    //           class:'artist',
    //           title: null,
    //           id: null,
    //           style: 'background-image:url({{images[0].url}})',
    //         }
    //       })}
    //     </ul>
    //   `;
    //
    //   createDOM({ html: dom, tag: 'container' });
    // }
    //
    // createTopTracksDOM(data) {
    //   const dom = escapeTemplate`
    //     <h2>Top Tracks for ${data.tracks[0].artists[0].name}</h2>
    //     <ul id="top-tracks" class="cards">
    //       ${each({
    //         data: data.tracks,
    //         tag: 'li',
    //         txt: `<div>
    //                 <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
    //               </div>
    //               <p>
    //                 from: <a href="#/album_{{album.id}}">{{album.name}}</a>
    //               </p>
    //               `,
    //         attrs: {
    //           class:'artist',
    //           title: null,
    //           id: null,
    //           style: 'background-image:url({{album.images[0].url}})',
    //         }
    //       })}
    //     </ul>
    //     `;
    //
    //   createDOM({ html: dom, tag: 'container' });
    // }
    //
    // createAlbumsDOM(data) {
    //   const dom = escapeTemplate`
    //   <h2>Albums by: ${data.items[0].artists[0].name}</h2>
    //     <ul id="top-tracks" class="cards">
    //       ${each({
    //         data: data.items,
    //         tag: 'li',
    //         txt: `<div>
    //                 <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
    //               </div>
    //               `,
    //         attrs: {
    //           class:'artist',
    //           title: null,
    //           id: null,
    //           style: 'background-image:url({{images[0].url}})',
    //         }
    //       })}
    //     </ul>
    //     `;
    //
    //   createDOM({ html: dom, tag: 'container' });
    // }
    //
    // createRecsDOM(data) {
    //   console.log(data)
    //   const dom = escapeTemplate`
    //   <h2>Playlist Inspired by: TEST</h2>
    //     <ul id="radio" class="cards">
    //       ${each({
    //         data: data.tracks,
    //         tag: 'li',
    //         txt: `<div>
    //                 <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
    //               </div>
    //               <p>
    //                 Album: <a href="#/album_{{album.id}}">{{album.name}}</a>
    //               </p>
    //               <p>By: <a href="#/artist_{{artists[0].name}}">{{artists[0].name}}</a>
    //               `,
    //         attrs: {
    //           class:'artist',
    //           title: null,
    //           id: null,
    //           style: 'background-image:url({{album.images[0].url}})',
    //         }
    //       })}
    //     </ul>
    //     `;
    //     createDOM({ html: dom, tag: 'container' });
    // }

  }]);

  return Location;
}();

exports.default = Location;