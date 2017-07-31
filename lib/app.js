'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _artist = require('./modules/artist');

var _artist2 = _interopRequireDefault(_artist);

var _artistForm = require('./modules/artist-form');

var _artistForm2 = _interopRequireDefault(_artistForm);

var _geolocation = require('./modules/geolocation');

var _geolocation2 = _interopRequireDefault(_geolocation);

var _addToStorage = require('./helpers/add-to-storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var artist = new _artist2.default();
var form = new _artistForm2.default();
var router = new _router2.default();
var geolocation = new _geolocation2.default();
var client_id = '1b7c83fc02404e08892183b94c0986a9';
var scope = 'playlist-modify-private playlist-modify-public';

function init() {
  //checks for Spotify Authorization
  if (router.getHash().split('=')[0] === '#access_token' && !sessionStorage.access_token) {
    sessionStorage.setItem('access_token', router.getHash().split('=')[1]);
    router.setHash(sessionStorage.hash);
    window.location.reload();
  } else if (!sessionStorage.access_token) {
    sessionStorage.setItem('hash', router.getHash());
    var http = void 0;

    if (window.location.hostname === 'localhost') {
      http = 'https://localhost:8082/index.html';
    } else {
      http = 'https://d2v5wkcovtgl6u.cloudfront.net';
    }

    var authorization_url = 'https://accounts.spotify.com/en/authorize?response_type=token&client_id=' + client_id + '&scope=' + encodeURIComponent(scope) + '&redirect_uri=' + http;

    window.open(authorization_url, '_self');
  } else {
    if (sessionStorage.hash && sessionStorage.hash.indexOf('/') === 0) {} else {
      sessionStorage.setItem('hash', '/' + sessionStorage.hash);
    }
    router.setHash(sessionStorage.hash);
    startApp();
  }
}

function startApp() {
  var withGeolocationAsked = !sessionStorage.getItem('geolocationAsked') || sessionStorage.getItem('geolocationAsked') === "false";

  if (withGeolocationAsked) {
    promptGeolocationModal();
  }

  var hash = router.getHash();

  if (hash) {
    router.getParamsFromHash(hash);
  }

  $(window).on('hashchange', function (e) {
    var hash = router.getHash();

    if (hash) {
      router.getParamsFromHash(hash);
    }
  });
  form.createArtistFormDom();
}

function promptGeolocationModal() {
  sessionStorage.setItem('geolocationAsked', true);

  return geolocation.getGeolocation().then(function (options) {
    return geolocation.buildMap(options);
  });
}

$(document).ready(init);