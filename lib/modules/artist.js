'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _relatedArtists = require('./related-artists');

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

var _createDom = require('../helpers/create-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Artist = function () {
  function Artist() {
    _classCallCheck(this, Artist);
  }

  _createClass(Artist, [{
    key: 'fetchArtists',

    //TODO: memoize this method javascript ninja book
    value: function fetchArtists() {
      return _jquery2.default.getJSON('https://api.spotify.com/v1/artists?ids=7jy3rLJdDQY21OgRLCZ9sD,5xUf6j4upBrXZPg6AI4MRK') || [{ name: 'Foo Fighters', id: '0' }];
    }
    //TODO: Try to think about how to abstract this to use for all situations of creating dom
    //perhaps a recursive function of

  }, {
    key: 'createArtistDom',
    value: function createArtistDom(data, action) {
      //TODO:create a each/loop helper and import
      var dom = '\n      <ul id="artists">\n        ' + data.map(function (artist) {
        return '\n          <li class="artist" id="' + artist.id + '">\n            ' + artist.name + '\n          </li>\n          ';
      }).join('') + '\n      </ul>\n      <script>\n        $(\'#artists\').' + action + '(() =>{\n          alert(\'clicked\')\n        })\n      </script>\n    ';

      return dom;
    }
  }]);

  return Artist;
}();

exports.default = Artist;