"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseUrl = exports.map = exports.router = undefined;
exports.default = init;

var _router = require("./router");

var _router2 = _interopRequireDefault(_router);

var _cityForm = require("./modules/city-form");

var _cityForm2 = _interopRequireDefault(_cityForm);

var _map = require("./modules/map");

var _map2 = _interopRequireDefault(_map);

var _navigation = require("./modules/navigation");

var _navigation2 = _interopRequireDefault(_navigation);

var _createDom = require("./helpers/create-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cityForm = new _cityForm2.default();
var router = exports.router = new _router2.default();
var map = exports.map = new _map2.default();
var navigation = new _navigation2.default();

var client_id = "1b7c83fc02404e08892183b94c0986a9";
var scope = "playlist-modify-private playlist-modify-public";

var baseUrl = exports.baseUrl = router.getBaseUrl().indexOf("localhost") > -1 ? "http://localhost:3000" : "https://api.musicwhereyour.com";

function init() {
  //checks for Spotify Authorization
  // if (
  //   router.getHash().split("=")[0] === "#access_token" &&
  //   !sessionStorage.access_token
  // ) {
  //   sessionStorage.setItem("access_token", router.getHash().split("=")[1]);
  //   router.setHash(sessionStorage.hash);
  //   window.location.reload();
  // } else if (!sessionStorage.access_token) {
  //   sessionStorage.setItem("hash", router.getHash());
  //   let http;

  //   if (window.location.hostname === "localhost") {
  //     http = "https://localhost:8082/index.html";
  //   } else {
  //     http = "https://d2v5wkcovtgl6u.cloudfront.net";
  //   }

  //   const authorization_url = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(
  //     scope
  //   )}&redirect_uri=${http}`;

  //   window.open(authorization_url, "_self");
  // } else {
  //   if (sessionStorage.hash && sessionStorage.hash.indexOf("/") === 0) {
  //   } else {
  //     sessionStorage.setItem("hash", `/${sessionStorage.hash}`);
  //   }
  //router.setHash(sessionStorage.hash || "");
  startApp();
  //}
}

function startApp() {
  var hash = router.getHash() || "map";
  router.setHash(hash);
  router.getParamsFromHash(hash);

  $(window).on("hashchange", function (e) {
    if (hash) {
      hash = router.getHash();
      navigation.createNavigationDOM();
      router.getParamsFromHash(hash);
    }
  });
  cityForm.createCityFormDom();
  navigation.createNavigationDOM();
}

$(document).ready(init);