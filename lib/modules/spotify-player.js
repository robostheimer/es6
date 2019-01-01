"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n       <iframe src=", " width=\"300\" height=\"100\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\n     "], ["\n       <iframe src=", " width=\"300\" height=\"100\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\n     "]);

var _createDom = require("../helpers/create-dom");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { each } from '../helpers/each-template';
// import { iff } from '../helpers/if-template';
// import { memoizeJSON, memoized } from '../helpers/memoize';
// import { addToStorage } from '../helpers/add-to-storage';

var auth_header = new Headers({
  Authorization: "Bearer " + sessionStorage.access_token
});

var SpotifyPlayer = function () {
  function SpotifyPlayer() {
    _classCallCheck(this, SpotifyPlayer);
  }

  _createClass(SpotifyPlayer, [{
    key: "createSpotifyPlayerDOM",

    // Creates spotify iframe player in app
    value: function createSpotifyPlayerDOM(id, username) {
      var url = "https://open.spotify.com/embed?uri=spotify:user:" + username + ":playlist:" + id;
      var playerDOM = (0, _createDom.escapeTemplate)(_templateObject, url);
      (0, _createDom.createDOM)({ html: playerDOM, tag: "#spotify-player", clear: true });
    }
  }]);

  return SpotifyPlayer;
}();

exports.default = SpotifyPlayer;