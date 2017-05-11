'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <ul id="related-artists">\n        <h4>Related Musicians</h4>\n        ', '\n      </ul>\n      '], ['\n      <ul id="related-artists">\n        <h4>Related Musicians</h4>\n        ', '\n      </ul>\n      ']);

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _ifTemplate = require('../helpers/if-template');

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
      if (id) {
        var request = new Request('https://api.spotify.com/v1/artists/' + id + '/related-artists', {
          method: 'GET'
        });

        return fetch(request).then(function (response) {
          return response.json();
        });
      }
    }
  }, {
    key: 'createRelatedArtistsDom',
    value: function createRelatedArtistsDom(data, params) {
      console.log(params);
      var dom = (0, _ifTemplate.iff)(data.length > 0, (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: data,
        tag: 'li',
        txt: '{{name}}',
        attrs: {
          class: 'related-artist',
          id: null
        }
      })), '<p><strong>There are no artists related to ' + params.title + '</strong</p>');
      (0, _createDom.createDOM)({ html: dom, tag: params.id });
    }
  }]);

  return RelatedArtist;
}();

exports.default = RelatedArtist;