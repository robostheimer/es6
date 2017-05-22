"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _artist = require('./artist');

var _artist2 = _interopRequireDefault(_artist);

var _artistForm = require('./artist-form');

var _artistForm2 = _interopRequireDefault(_artistForm);

var _relatedArtists = require('./related-artists');

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = window.location.hash;

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, [{
    key: 'logHash',
    value: function logHash() {
      // if(hash === "artist:name") {
      //
      // }
      console.log(hash);
    }
  }]);

  return Router;
}();

exports.default = Router;