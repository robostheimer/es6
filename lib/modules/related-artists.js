'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <ul id="related-artists" class="cards related">\n        <h4>Related Musicians</h4>\n        ', '\n      </ul>\n      '], ['\n      <ul id="related-artists" class="cards related">\n        <h4>Related Musicians</h4>\n        ', '\n      </ul>\n      ']);

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _ifTemplate = require('../helpers/if-template');

var _memoize = require('../helpers/memoize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RelatedArtists = function () {
  function RelatedArtists() {
    _classCallCheck(this, RelatedArtists);
  }

  _createClass(RelatedArtists, [{
    key: 'fetchRelatedArtists',

    //TODO: memoize this method; see javascript ninja book
    value: function fetchRelatedArtists(id) {
      if (id && !(0, _memoize.memoized)(id)) {

        var url = 'https://api.spotify.com/v1/artists/' + id + '/related-artists';

        var data = (0, _memoize.memoizeJSON)({ key: id,
          fn: function fn() {
            return fetch(url);
          }
        });
        return data;
      }
    }
  }, {
    key: 'createRelatedArtistsDom',
    value: function createRelatedArtistsDom(data, params) {
      var dom = (0, _ifTemplate.iff)(data.artists.length > 0, (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: data.artists,
<<<<<<< HEAD
        tag: 'a',
        txt: '<li>{{name}}</li>',
=======
        tag: 'li',
        txt: '{{name}}',
>>>>>>> be58cecb2766f6b185beecf36b3701d530c0115d
        attrs: {
          class: 'related-artist',
          id: null,
          href: '#artist_{{name}}'
        }
      })), '<p><strong>There are no artists related</strong</p>');
      (0, _createDom.createDOM)({ html: dom, tag: 'body' });
    }
  }]);

  return RelatedArtists;
}();

exports.default = RelatedArtists;