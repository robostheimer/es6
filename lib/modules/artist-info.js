'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <h4>Info about ', '</h4>\n      \n      '], ['\n      <h4>Info about ', '</h4>\n      \n      ']);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _ifTemplate = require('../helpers/if-template');

var _memoize = require('../helpers/memoize');

var _addToStorage = require('../helpers/add-to-storage');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var auth_header = new Headers({
  'Authorization': 'Bearer ' + sessionStorage.access_token
});

var ArtistInfo = function () {
  function ArtistInfo() {
    _classCallCheck(this, ArtistInfo);
  }

  _createClass(ArtistInfo, [{
    key: 'fetchArtistInfo',

    //TODO: memoize this method; see javascript ninja book
    value: function fetchArtistInfo() {
      var artistname = arguments.length <= 1 ? undefined : arguments[1];
      var url = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistname + '&api_key=1f91c93293d618de5c30f8cfe2e9f5e9&format=json';
      var data = (0, _memoize.memoizeJSON)({ key: artistname + '_info',
        fn: function fn() {
          return fetch(url, {
            headers: auth_header
          });
        }
      });
      (0, _addToStorage.addToStorage)('hash', 'artist/info/' + artistname);

      return data;
    }
  }, {
    key: 'createInfoDOM',
    value: function createInfoDOM(data) {
      console.log(data.data.artist.name);
      var dom = (0, _ifTemplate.iff)(data.data.artist, (0, _createDom.escapeTemplate)(_templateObject, data.data.artist.name), '<p><strong>There are no artists related</strong</p>');
      (0, _createDom.createDOM)({ html: dom, tag: 'container' });
    }
  }]);

  return ArtistInfo;
}();

exports.default = ArtistInfo;