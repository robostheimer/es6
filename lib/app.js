'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _artist = require('./modules/artist');

var _artist2 = _interopRequireDefault(_artist);

var _artistForm = require('./modules/artist-form');

var _artistForm2 = _interopRequireDefault(_artistForm);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var artist = new _artist2.default();
var form = new _artistForm2.default();
var router = new _router2.default();

function init() {
  form.createArtistFormDom();
  router.logHash();
  var hash = window.location.hash.replace('#', ''),
      args = createHashArgs(hash);

  if (hash) {
    router.makeHash(args.route, args.id);
  }

  $(window).on('hashchange', function () {
    var hash = window.location.hash.replace('#', ''),
        args = createHashArgs(hash);
    if (hash) {
      router.makeHash(args.route, args.id);
    }
  });

  document.getElementById('search').addEventListener('click', function (event) {
    if (event.preventDefault) {
      debugger;
      event.preventDefault();
    }
    _makeHash();
  });

  //adds onEnter to the input
  // document.getElementById('find-artist').addEventListener('keypress', (event) => {
  //   if(event.keyCode === 13) {
  //     event.preventDefault();
  //     this._makeHash()
  //   }
  // });

  function _makeHash() {
    var val = document.getElementById('find-artist').value;

    router.makeHash('artist', val);
  }
}

function createHashArgs(hash) {
  var hashArr = void 0,
      route = void 0,
      id = void 0;

  hashArr = hash.split('_');
  route = hashArr[0];
  id = hashArr[1];

  return { id: id, route: route };
}

$(document).ready(init);