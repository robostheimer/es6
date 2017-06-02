'use strict';

//import $ from '../../node_modules/jquery/dist/jquery.min';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createDom = require('../helpers/create-dom');

var _addToStorage = require('../helpers/add-to-storage');

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = new _router2.default();

var SpotifyPlayer = function () {
  function SpotifyPlayer() {
    _classCallCheck(this, SpotifyPlayer);
  }

  _createClass(SpotifyPlayer, [{
    key: 'createNewPlaylist',
    value: function createNewPlaylist() {
      ///v1/users/{user_id}/playlists
    }
  }, {
    key: 'addTracksToPlaylist',
    value: function addTracksToPlaylist() {
      ///v1/users/{user_id}/playlists/{playlist_id}/tracks
    }
  }]);

  return SpotifyPlayer;
}();

exports.default = SpotifyPlayer;