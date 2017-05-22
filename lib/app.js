'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _artist = require('./modules/artist');

var _artist2 = _interopRequireDefault(_artist);

var _artistForm = require('./modules/artist-form');

var _artistForm2 = _interopRequireDefault(_artistForm);

var _router = require('./router/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var artist = new _artist2.default();
var form = new _artistForm2.default();
var router = new _router2.default();

function init() {
  form.createArtistFormDom('click');
  router.logHash();

  // artist.fetchArtists().then((data) => {
  //   artist.createArtistDom(data.artists, 'click');
  // });
}

$(document).ready(init);