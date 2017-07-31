'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n        <div class="loader" id="loader">\n        LOADING...\n        </div>'], ['\n        <div class="loader" id="loader">\n        LOADING...\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['\n      TEST\n    '], ['\n      TEST\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n      <div>\n        Would you like to learn about musicians from your current location?\n      </div>'], ['\n      <div>\n        Would you like to learn about musicians from your current location?\n      </div>']);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _memoize = require('../helpers/memoize');

var _addToStorage = require('../helpers/add-to-storage');

var _map = require('../modules/map');

var _map2 = _interopRequireDefault(_map);

var _modalCreate = require('./modal-create');

var _modalCreate2 = _interopRequireDefault(_modalCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var map = new _map2.default();
var modal = new _modalCreate2.default();

//TODO: Need to add album and track class/components to support linking.

var Geolocation = function () {
  function Geolocation() {
    _classCallCheck(this, Geolocation);
  }

  _createClass(Geolocation, [{
    key: 'getGeolocation',
    value: function getGeolocation() {
      // Checks if Geolocation is available;
      // If it is is runs the handle_geolocation_query or the handle Gelocation.handle)errors function if access to the Geolocation API is denied by the user
      var geolocation = function geolocation() {
        var loaderDom = (0, _createDom.escapeTemplate)(_templateObject); //make this a dom component that can be added
        modal.createModal();
        (0, _createDom.createDOM)({ html: loaderDom, tag: 'modal-container' });
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(function (position) {
            resolve({ position: position.coords, location: 'test', tag: 'modal-container' });
          }, function (error) {
            alert('There was an error!');
          });
        });
      };

      return geolocation();
    }
  }, {
    key: '_handleErrors',
    value: function _handleErrors(error) {
      alert(error);
    }
  }, {
    key: 'buildMap',
    value: function buildMap(options) {
      (0, _createDom.clearDOM)('loader');
      map.buildMap(options.position.latitude, options.position.longitude, options.location, options.tag);
      var titleDom = (0, _createDom.escapeTemplate)(_templateObject2);
      var ctaDom = (0, _createDom.escapeTemplate)(_templateObject3);

      (0, _createDom.createDOM)({ html: titleDom, tag: 'modal-headline', clear: true });
      (0, _createDom.createDOM)({ html: ctaDom, tag: 'modal-footer', clear: false });

      modal.createButtons([{
        id: 'yes',
        value: 'Yes please',
        route: function route() {} }, {
        id: 'no',
        value: 'No thanks',
        route: function route() {} }]);
    }
  }, {
    key: '_getArtistsFromLocation',
    value: function _getArtistsFromLocation(lat, lng, ratio) {
      var request = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+CityName%2C+Region%2C+CountryID+FROM+1B8NpmfiAc414JhWeVZcSqiz4coLc_OeIh7umUDGs+WHERE+Lat+<="' + (lat + ratio) + '"+AND+Lat>=' + (lat - ratio) + '"+AND+Long<=' + (lng + ratio) + '+AND+Long>=' + (lng - ratio) + '&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0,';
      var data = (0, _memoize.memoizeJSON)({ key: 'geolocation_' + lat_lng,
        fn: function fn() {
          return fetch(request);
        }
      });

      return data;
    }

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

  return Geolocation;
}();

exports.default = Geolocation;