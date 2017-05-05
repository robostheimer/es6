'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;
exports.createAppDom = createAppDom;
exports.renderRelatedArtists = renderRelatedArtists;

var _artist = require('./modules/artist');

var _artist2 = _interopRequireDefault(_artist);

var _relatedArtists = require('./modules/related-artists');

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

var _jquery = require('../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var artist = new _artist2.default();
var related = new _relatedArtists2.default();

function init() {
  artist.fetchArtists().then(function (data) {
    console.log(data);
    createAppDom(data.artists);
  });
}

function createAppDom(data) {
  //TODO:create a each/loop helper and import
  var dom = '\n  <ul id="artists">\n    ' + data.map(function (artist) {
    return '\n      <li class="artist" id="' + artist.id + '">\n        ' + artist.name + '\n      </li>\n      ';
  }).join('') + '\n  </ul>\n  ';

  (0, _jquery2.default)('body').html(dom);

  //Action on artists component
  (0, _jquery2.default)('#artists').click(function (e) {
    renderRelatedArtists(e.target.id);
  });
}

function renderRelatedArtists(id) {
  related.fetchRelatedArtists(id).then(function (data) {
    console.log(data);
  });
}

init();