'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <h2>Tracklist for ', '</h2>\n      <ul id="top-tracks" class="cards">\n        ', '\n      </ul>\n      '], ['\n      <h2>Tracklist for ', '</h2>\n      <ul id="top-tracks" class="cards">\n        ', '\n      </ul>\n      ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <h2>Albums by: ', '</h2>\n      <ul id="top-tracks" class="cards">\n        ', '\n      </ul>\n      '], ['\n    <h2>Albums by: ', '</h2>\n      <ul id="top-tracks" class="cards">\n        ', '\n      </ul>\n      ']);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _memoize = require('../helpers/memoize');

var _addToStorage = require('../helpers/add-to-storage');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCOPE = 'playlist-modify-private playlist-modify-public';
var CLIENT_ID = '6e385b2a58fa42f6832a3a0bc3152c23';
var auth_header = new Headers({
  'Authorization': 'Bearer ' + sessionStorage.access_token
});

//TODO: Need to add album and track class/components to support linking.

var Artist = function () {
  function Artist() {
    _classCallCheck(this, Artist);
  }

  _createClass(Artist, [{
    key: 'fetchAlbum',
    value: function fetchAlbum(id) {
      debugger;
      var url = 'https://api.spotify.com/v1/albums/' + id + '/tracks';
      if (id) {
        var data = (0, _memoize.memoizeJSON)({ key: name,
          fn: function fn() {
            return fetch(url, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)('hash', 'album_' + id);
        return data;
      }
    }
  }, {
    key: 'fetchAllAlbums',
    value: function fetchAllAlbums(artist_id) {
      var url = 'https://api.spotify.com/v1/artists/' + artist_id + '/albums';
      if (artist_id) {
        var data = (0, _memoize.memoizeJSON)({ key: name,
          fn: function fn() {
            return fetch(url, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)('hash', 'albums_' + artist_id);
        return data;
      }
    }
  }, {
    key: 'createAlbumDOM',
    value: function createAlbumDOM(data) {
      var dom = (0, _createDom.escapeTemplate)(_templateObject, data.items[0].name.split('-')[1], (0, _eachTemplate.each)({
        data: data.items,
        tag: 'li',
        txt: '<div>\n                  <strong>{{name}}</a></strong>\n                </div>\n                ',
        attrs: {
          class: 'artist',
          title: null,
          id: null
        }
      }));

      (0, _createDom.createDOM)({ html: dom, tag: 'container' });
    }
  }, {
    key: 'createAlbumsDOM',
    value: function createAlbumsDOM(data) {
      var dom = (0, _createDom.escapeTemplate)(_templateObject2, data.items[0].artists[0].name, (0, _eachTemplate.each)({
        data: data.items,
        tag: 'li',
        txt: '<div>\n                  <strong><a href="#album_{{id}}">{{name}}</a></strong>\n                </div>\n                ',
        attrs: {
          class: 'artist',
          title: null,
          id: null,
          style: 'background-image:url({{images[0].url}})'
        }
      }));

      (0, _createDom.createDOM)({ html: dom, tag: 'container' });
    }
  }]);

  return Artist;
}();

exports.default = Artist;