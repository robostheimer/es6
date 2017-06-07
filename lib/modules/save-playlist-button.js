'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <h4>Related Musicians</h4>\n      <ul id="related-artists" class="cards">\n        ', '\n      </ul>\n      '], ['\n      <h4>Related Musicians</h4>\n      <ul id="related-artists" class="cards">\n        ', '\n      </ul>\n      ']);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _ifTemplate = require('../helpers/if-template');

var _memoize = require('../helpers/memoize');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var auth_header = new Headers({
  'Authorization': 'Bearer ' + sessionStorage.access_token
});

var RelatedArtists = function () {
  function RelatedArtists() {
    _classCallCheck(this, RelatedArtists);
  }

  _createClass(RelatedArtists, [{
    key: 'fetchSpotifyProfile',

    //TODO: memoize this method; see javascript ninja book
    value: function fetchSpotifyProfile(id) {
      var url = 'https://api.spotify.com/v1/me';

      var data = (0, _memoize.memoizeJSON)({ key: id,
        fn: function fn() {
          return fetch(url, {
            headers: auth_header
          });
        }
      });
      return data;
    }
  }, {
    key: 'createRelatedArtistsDom',
    value: function createRelatedArtistsDom(data, params) {
      var dom = (0, _ifTemplate.iff)(data.artists.length > 0, (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: data.artists,
        tag: 'li',
        txt: '<a href="#artist_{{name}}">{{name}}</a>',
        attrs: {
          class: 'related-artist',
          id: null,
          style: 'background-image:url({{images[0].url}})'
        }
      })), '<p><strong>There are no artists related</strong</p>');
      (0, _createDom.createDOM)({ html: dom, tag: 'container' });
    }
  }]);

  return RelatedArtists;
}();

exports.default = RelatedArtists;