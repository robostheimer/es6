'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <ul id="artists" class="cards">\n        ', '\n      </ul>\n    '], ['\n      <ul id="artists" class="cards">\n        ', '\n      </ul>\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      <h2>Top Tracks for ', '</h2>\n      <ul id="top-tracks" class="cards">\n        ', '\n      </ul>\n      '], ['\n      <h2>Top Tracks for ', '</h2>\n      <ul id="top-tracks" class="cards">\n        ', '\n      </ul>\n      ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <h2>Albums by: ', '</h2>\n      <ul id="top-tracks" class="cards">\n        ', '\n      </ul>\n      '], ['\n    <h2>Albums by: ', '</h2>\n      <ul id="top-tracks" class="cards">\n        ', '\n      </ul>\n      ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    <h2>Playlist Inspired by: TEST</h2>\n      <ul id="radio" class="cards">\n        ', '\n      </ul>\n      '], ['\n    <h2>Playlist Inspired by: TEST</h2>\n      <ul id="radio" class="cards">\n        ', '\n      </ul>\n      ']);

var _relatedArtists = require('./related-artists');

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _memoize = require('../helpers/memoize');

var _addToStorage = require('../helpers/add-to-storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var related = new _relatedArtists2.default();
var SCOPE = 'playlist-modify-private playlist-modify-public';
var CLIENT_ID = '6e385b2a58fa42f6832a3a0bc3152c23';
var auth_header = new Headers({
  'Authorization': 'Bearer ' + sessionStorage.access_token
});

var Artist = function () {
  function Artist() {
    _classCallCheck(this, Artist);
  }

  _createClass(Artist, [{
    key: 'fetchArtists',

    //TODO: memoize this method javascript ninja book

    value: function fetchArtists(name) {
      var url = 'https://api.spotify.com/v1/search?q=' + name + '&type=artist';
      if (name) {
        var data = (0, _memoize.memoizeJSON)({ key: name,
          fn: function fn() {
            return fetch(url, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)('hash', 'aritst_' + name);
        return data;
      }
    }
  }, {
    key: 'fetchTopTracks',
    value: function fetchTopTracks(id) {
      var request = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US';

      if (id) {
        var data = (0, _memoize.memoizeJSON)({ key: 'top_' + id,
          fn: function fn() {
            return fetch(request, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)('hash', 'top_' + id);
        return data;
      }
    }
  }, {
    key: 'fetchAlbums',
    value: function fetchAlbums(id) {
      var request = 'https://api.spotify.com/v1/artists/' + id + '/albums';

      if (id) {
        var data = (0, _memoize.memoizeJSON)({ key: 'albums_' + id,
          fn: function fn() {
            return fetch(request, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)('hash', 'albums_' + id);
        return data;
      }
    }
  }, {
    key: 'fetchRecommendations',
    value: function fetchRecommendations(id) {
      var request = 'https://api.spotify.com/v1/recommendations?seed_artists=' + id + '&limit=50';

      if (id) {
        var data = (0, _memoize.memoizeJSON)({ key: 'recs_' + id,
          fn: function fn() {
            return fetch(request, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)('hash', 'recommendations_' + id);
        return data;
      }
    }

    //TODO: Try to think about how to abstract this to use for all situations of creating dom
    //perhaps a recursive function of

  }, {
    key: 'createArtistDom',
    value: function createArtistDom(data) {
      //, params) {
      $('#artists').remove();
      //const action = params.action;
      var dom = (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: data.artists.items,
        tag: 'li',
        txt: '<div>\n                  <strong>{{name}}</strong>\n                </div>\n                <ul class="options">\n                  <li>\n                    <a href="#related_{{id}}">\n                      Related Musicians\n                    </a>\n                  </li>\n                  <li>\n                    <a href="#top_{{id}}">\n                      Top Tracks\n                    </a>\n                  </li>\n                  <li>\n                    <a href="#albums_{{id}}">\n                      Albums\n                    </a>\n                  </li>\n                  <li>\n                    <a href="#recommendations_{{id}}">\n                      Create Radio Station\n                    </a>\n                  <li>\n                  <li>\n                    <a>\n                      Other musicians from {{location}}\n                    </a>\n                  </li>\n                </ul>\n                ',
        attrs: {
          class: 'artist',
          title: null,
          id: null,
          style: 'background-image:url({{images[0].url}})'
        }
      }));

      (0, _createDom.createDOM)({ html: dom, tag: 'container' });
    }
  }, {
    key: 'createTopTracksDOM',
    value: function createTopTracksDOM(data) {
      var dom = (0, _createDom.escapeTemplate)(_templateObject2, data.tracks[0].artists[0].name, (0, _eachTemplate.each)({
        data: data.tracks,
        tag: 'li',
        txt: '<div>\n                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>\n                </div>\n                <p>\n                  from: <a href="#album_{{album.id}}">{{album.name}}</a>\n                </p>\n                ',
        attrs: {
          class: 'artist',
          title: null,
          id: null,
          style: 'background-image:url({{album.images[0].url}})'
        }
      }));

      (0, _createDom.createDOM)({ html: dom, tag: 'container' });
    }
  }, {
    key: 'createAlbumsDOM',
    value: function createAlbumsDOM(data) {
      var dom = (0, _createDom.escapeTemplate)(_templateObject3, data.items[0].artists[0].name, (0, _eachTemplate.each)({
        data: data.items,
        tag: 'li',
        txt: '<div>\n                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>\n                </div>\n                ',
        attrs: {
          class: 'artist',
          title: null,
          id: null,
          style: 'background-image:url({{images[0].url}})'
        }
      }));

      (0, _createDom.createDOM)({ html: dom, tag: 'container' });
    }
  }, {
    key: 'createRecsDOM',
    value: function createRecsDOM(data) {
      console.log(data);
      var dom = (0, _createDom.escapeTemplate)(_templateObject4, (0, _eachTemplate.each)({
        data: data.tracks,
        tag: 'li',
        txt: '<div>\n                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>\n                </div>\n                <p>\n                  Album: <a href="#album_{{album.id}}">{{album.name}}</a>\n                </p>\n                <p>By: <a href="#artist_{{artists[0].name}}">{{artists[0].name}}</a>\n                ',
        attrs: {
          class: 'artist',
          title: null,
          id: null,
          style: 'background-image:url({{album.images[0].url}})'
        }
      }));
      (0, _createDom.createDOM)({ html: dom, tag: 'container' });
    }
  }]);

  return Artist;
}();

exports.default = Artist;