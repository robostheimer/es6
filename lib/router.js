"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import Geolocation from "./modules/geolocation";


var _artist = require("./modules/artist");

var _artist2 = _interopRequireDefault(_artist);

var _relatedArtists = require("./modules/related-artists");

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

var _albums = require("./modules/albums");

var _albums2 = _interopRequireDefault(_albums);

var _artistInfo = require("./modules/artist-info");

var _artistInfo2 = _interopRequireDefault(_artistInfo);

var _location = require("./modules/location");

var _location2 = _interopRequireDefault(_location);

var _map = require("./modules/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import Modal from './modules/create-modal';

var hash = window.location.hash.replace("#", "");
var artist = new _artist2.default();
var related = new _relatedArtists2.default();
var album = new _albums2.default();
var artistInfo = new _artistInfo2.default();
//const geolocation = new Geolocation();
var location = new _location2.default();
var map = new _map2.default();

var routeMap = {
  "": {
    className: map,
    hash: "map",
    fetch: "fetchGeolocation",
    dom: "buildMap"
  },
  artist: {
    className: artist,
    hash: "artist",
    fetch: "fetchArtists",
    fetchSpotify: "fetchArtistsSpotify",
    dom: "createArtistDom",
    subRoutes: [{
      hash: "info",
      className: artistInfo,
      parentClass: "artist",
      fetch: "fetchArtistInfo",
      dom: "createInfoDOM"
    }]
  },
  related: {
    className: related,
    hash: "related",
    fetch: "fetchRelatedArtists",
    fetchSpotify: "fetchRelatedArtistsSpotify",
    dom: "createRelatedArtistsDom"
  },
  top: {
    className: artist,
    hash: "top",
    fetch: "fetchTopTracks",
    fetchSpotify: "fetchTopTracksSpotify", //need to add this method
    dom: "createTopTracksDOM"
  },
  albums: {
    className: album,
    hash: "albums",
    fetch: "fetchAllAlbums",
    fetchSpotify: "fetchAllAlbumsSpotify",
    dom: "createAlbumsDOM"
  },
  album: {
    className: album,
    hash: "album",
    fetch: "fetchAlbum",
    dom: "createAlbumDOM"
  },
  recommendations: {
    className: artist,
    hash: "recommendations",
    fetch: "fetchRecommendations",
    dom: "createRecsDOM"
  },

  map: {
    className: map,
    hash: "map",
    fetch: "fetchGeolocation",
    dom: "buildMap"
  },

  location: {
    className: location,
    hash: "location",
    fetch: "fetchLocationArtists",
    dom: "createCityArtistsDOM",
    subRoutes: [{
      hash: "tracks",
      className: location,
      parentClass: "location",
      fetch: "fetchTopTracksFromLocation",
      dom: "createCityTracksDOM"
    }]
  },
  city: {
    className: location,
    hash: "city",
    fetch: "fetchTopTracksFromCity",
    dom: "createCityMapDOM",
    subRoutes: [{
      hash: "tracks",
      className: location,
      parentClass: "location",
      fetch: "fetchTopTracksFromCity",
      dom: "createCityTracksDOM"
    }, {
      hash: "tracks/:genres",
      className: location,
      parentClass: "location",
      fetch: "fetchTopTracksFromCity",
      dom: "createCityTracksDOM"
    }, {
      hash: "artists",
      className: location,
      parentClass: "location",
      fetch: "fetchCityArtists",
      dom: "createCityArtistsDOM"
    }, {
      hash: "artists/:genres",
      className: location,
      parentClass: "location",
      fetch: "fetchCityArtists",
      dom: "createCityArtistsDOM"
    }]
  }
};

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, [{
    key: "getBaseUrl",
    value: function getBaseUrl() {
      return window.location.host;
    }
  }, {
    key: "logHash",
    value: function logHash() {
      console.log(hash);
    }
  }, {
    key: "setHash",
    value: function setHash(str) {
      var regex = new RegExp(/\/#\//g);

      window.location.hash = str.replace(regex, "/");
    }
  }, {
    key: "getHash",
    value: function getHash(str) {
      return window.location.hash;
    }
  }, {
    key: "goBack",
    value: function goBack() {
      window.history.back();
    }
  }, {
    key: "getParamsFromHash",
    value: function getParamsFromHash(str) {
      var hash = decodeURIComponent(str.replace(/#\//g, "").replace("#", "")),
          hashObj = this._createHashArgs(hash);

      var routeForData = void 0;
      if (hashObj.route) {
        routeMap[hashObj.route]["subRoutes"] ? routeForData = this._checkSubRoute(routeMap[hashObj.route], hash) : routeForData = routeMap[hashObj.route];

        this.hashToData(routeForData, hashObj.id, hashObj.name, hashObj.params);
      }
    }
  }, {
    key: "hashToData",
    value: function hashToData(route, id, name, params) {
      var className = void 0,
          prop = void 0,
          options = {};

      className = route.route ? route.route.className : route.className;
      route.isSubRoute ? className = route.route.className : routeMap[route.hash].className;
      route.isSubRoute ? prop = route.route : prop = routeMap[route.hash];

      options = {
        className: className,
        prop: prop,
        id: id,
        name: name,
        params: params
      };

      return this._fetchData(options);
    }
  }, {
    key: "_fetchData",
    value: function _fetchData(options) {
      var _this = this;

      var property = options.hasSpotifyBackup ? options.prop.fetchSpotify : options.prop.fetch;
      return options.className[property](options.id, options.params).then(function (data) {
        if (data && !data.error) {
          if (options.params) {
            var params = options.params;
            return options.className[options.prop.dom](data, params);
          } else {
            return options.className[options.prop.dom](data);
          }
        }
        // if problem with fusion tables, use spotify as a backup
        else if (data && data.error && data.error.code === 400 && options.className.hasBackup()) {
            options.hasSpotifyBackup = true;
            _this._fetchData(options);
          }
          //reloads in case of auth error to get user back into auth flow
          else if (data && data.error && data.error.status === 401) {
              window.location.reload();
              sessionStorage.clear();
            } else {
              return "There was an error processing your request. Please try again.";
              window.location.reload();
            }
      });
    }
  }, {
    key: "_checkSubRoute",
    value: function _checkSubRoute(route, hash) {
      var subRoute = route["subRoutes"].filter(function (sroute) {
        return hash.indexOf(sroute.hash) > -1;
      });

      if (subRoute.length > 0) {
        return { route: subRoute[0], hash: subRoute[0].hash, isSubRoute: true };
      }
      return { route: route, hash: route.hash, isSubRoute: false };
    }
  }, {
    key: "_createHashArgs",
    value: function _createHashArgs(hash) {
      var hashArr = void 0,
          route = void 0,
          id = void 0,
          name = void 0,
          params = void 0;

      hashArr = hash.split("/") || hash.split("_"), route = hashArr[0], id = hashArr[1], name = hashArr[2];
      params = hashArr[3];

      return { id: id, route: route, name: name, params: params };
    }
  }]);

  return Router;
}();

exports.default = Router;