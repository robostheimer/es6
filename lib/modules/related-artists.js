'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RelatedArtist = function () {
  function RelatedArtist() {
    _classCallCheck(this, RelatedArtist);
  }

  _createClass(RelatedArtist, [{
    key: 'fetchRelatedArtists',

    //TODO: memoize this method
    value: function fetchRelatedArtists(id) {
      return _jquery2.default.getJSON('https://api.spotify.com/v1/artists/' + id + '/related-artists');
    }
  }, {
    key: 'createRelatedArtists',
    value: function createRelatedArtists(data) {
      console.log(data);
      //TODO:create a each/loop helper and import
      var dom = '\n      <ul id="artists">\n        ' + data.map(function (artist) {
        return '\n          <li class="artist" id="' + artist.id + '">\n            ' + artist.name + '\n          </li>\n          ';
      }).join('') + '\n      </ul>\n    ';
      return dom;
    }
  }]);

  return RelatedArtist;
}();

exports.default = RelatedArtist;