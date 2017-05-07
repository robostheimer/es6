'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;
exports.createAppDom = createAppDom;

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
    var dom = artist.createArtistDom(data.artists);
    createAppDom(dom, 'body');
  });
}

function createAppDom(dom, tag) {
  //TODO:create a each/loop helper and import

  (0, _jquery2.default)(tag).html(dom);
}

// export function renderRelatedArtists(id) {
//   related.fetchRelatedArtists(id).then((data) => {
//     console.log(data)
//   })
// }

init();