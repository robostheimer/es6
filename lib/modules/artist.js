'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <ul id="artists" class="cards">\n        ', '\n      </ul>\n    '], ['\n      <ul id="artists" class="cards">\n        ', '\n      </ul>\n    ']);

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _relatedArtists = require('./related-artists');

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _memoize = require('../helpers/memoize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var related = new _relatedArtists2.default();

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
            return fetch(url);
          }
        });

        return data;
      }
    }

    //TODO: Try to think about how to abstract this to use for all situations of creating dom
    //perhaps a recursive function of

  }, {
    key: 'createArtistDom',
    value: function createArtistDom(data) {
      //, params) {
      (0, _jquery2.default)('#artists').remove();
      //const action = params.action;
      var dom = (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: data.artists.items,
        tag: 'a',
        txt: '<li>\n                  <div>\n                    <strong>{{name}}</strong>\n                  </div>\n                </li>\n                ',
        attrs: {
          class: 'artist',
          title: null,
          id: null,
          style: 'background-image:url({{images[0].url}})',
          href: '#related_{{id}}'
        }
      }));

      (0, _createDom.createDOM)({ html: dom, tag: 'body' });
    }
  }]);

  return Artist;
}();

exports.default = Artist;