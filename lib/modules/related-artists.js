'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <ul id="related-artists">\n        ', '\n      </ul>\n    '], ['\n      <ul id="related-artists">\n        ', '\n      </ul>\n    ']);

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _createDom = require('../helpers/create-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RelatedArtist = function () {
  function RelatedArtist() {
    _classCallCheck(this, RelatedArtist);
  }

  _createClass(RelatedArtist, [{
    key: 'fetchRelatedArtists',

    //TODO: memoize this method; see javascript ninja book
    value: function fetchRelatedArtists(id) {
      return _jquery2.default.getJSON('https://api.spotify.com/v1/artists/' + id + '/related-artists');
    }
  }, {
    key: 'createRelatedArtistsDom',
    value: function createRelatedArtistsDom(data, params) {
      var dom = (0, _createDom.escapeTemplate)(_templateObject, data.map(function (artist) {
        return '\n          <li class="related-artist" id=' + artist.id + '>\n            ' + artist.name + '\n          </li>\n          ';
      }).join(''));
      (0, _createDom.createDOM)({ html: dom, tag: params.id });
    }
  }]);

  return RelatedArtist;
}();

exports.default = RelatedArtist;