'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _ifTemplate = require('../helpers/if-template');

var _memoize = require('../helpers/memoize');

var _addToStorage = require('../helpers/add-to-storage');

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
      console.log(data.data.artist);
      // const dom = iff(data.artists.length > 0,
      // escapeTemplate`
      //   <h4>Related Musicians</h4>
      //   <ul id="related-artists" class="cards">
      //     ${each({
      //       data: data.artists,
      //       tag: 'li',
      //       txt: '<a href="#/artist/{{name}}">{{name}}</a>',
      //       attrs: {
      //         class: 'related-artist',
      //         id: null,
      //         style: 'background-image:url({{images[0].url}})'
      //       }
      //     })}
      //   </ul>
      //   `,
      //   `<p><strong>There are no artists related</strong</p>`);
      // createDOM({ html: dom, tag: 'container' });
    }
  }]);

  return ArtistInfo;
}();

exports.default = ArtistInfo;