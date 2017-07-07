"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _artist = require('./modules/artist');

var _artist2 = _interopRequireDefault(_artist);

var _relatedArtists = require('./modules/related-artists');

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

var _albums = require('./modules/albums');

var _albums2 = _interopRequireDefault(_albums);

var _artistInfo = require('./modules/artist-info');

var _artistInfo2 = _interopRequireDefault(_artistInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = window.location.hash.replace('#', '');
var artist = new _artist2.default();
var related = new _relatedArtists2.default();
var album = new _albums2.default();
var artistInfo = new _artistInfo2.default();

var routeMap = {
  artist: {
    className: artist,
    hash: 'artist',
    fetch: 'fetchArtists',
    dom: 'createArtistDom',
    subRoutes: [{
      hash: 'info',
      className: artistInfo,
      parentClass: 'artist',
      fetch: 'fetchArtistInfo',
      dom: 'createInfoDOM'
    }]
  },
  related: {
    className: related,
    hash: 'related',
    fetch: 'fetchRelatedArtists',
    dom: 'createRelatedArtistsDom'
  },
  top: {
    className: artist,
    hash: 'top',
    fetch: 'fetchTopTracks',
    dom: 'createTopTracksDOM'
  },
  albums: {
    className: album,
    hash: 'albums',
    fetch: 'fetchAllAlbums',
    dom: 'createAlbumsDOM'
  },
  album: {
    className: album,
    hash: 'album',
    fetch: 'fetchAlbum',
    dom: 'createAlbumDOM'
  },
  recommendations: {
    className: artist,
    hash: 'recommendations',
    fetch: 'fetchRecommendations',
    dom: 'createRecsDOM'
  }
};

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, [{
    key: 'logHash',
    value: function logHash() {
      console.log(hash);
    }
  }, {
    key: 'makeHash',
    value: function makeHash() {
      var params = arguments.length <= 0 ? undefined : arguments[0],
          route = params.route,
          name = params.name,
          id = params.id,
          routeForData = void 0,
          hash = void 0;

      if (name) {
        hash = '/' + route + '/' + id + '/' + name;
        window.location.hash = hash;
      } else {
        hash = '/' + route + '/' + id;
        window.location.hash = hash;
      }
      routeMap[route]['subRoutes'] ? routeForData = this._checkSubRoute(routeMap[route], hash) : routeForData = routeMap[route];
      this.hashToData(routeForData, id, name);
    }
  }, {
    key: 'hashToData',
    value: function hashToData(route, id, name) {
      var className = void 0,
          prop = void 0;

      if (route.isSubRoute) {
        className = route.route.className;
        prop = route.route;
      } else {
        className = routeMap[route.hash].className;
        prop = routeMap[route.hash];
      }

      return className[prop.fetch](id, name).then(function (data) {
        if (!data.error) {
          if (name) {
            return className[prop.dom]({ data: data, name: name });
          } else {
            return className[prop.dom](data);
          }
        }
        //reloads in case of auth error to get user back into auth flow
        else if (data.error.status === 401) {
            window.location.reload();
            sessionStorage.clear();
          } else {
            return 'There was an error processing your request. Please try again.';
            window.location.reload();
          }
      });
    }
  }, {
    key: '_checkSubRoute',
    value: function _checkSubRoute(route, hash) {
      // TODO: Check if the hash matches any of the subRoutes
      // If so make the route, the subRoute
      var subRoute = route['subRoutes'].filter(function (sroute) {
        return hash.indexOf(sroute.hash) > -1;
      });

      if (subRoute.length > 0) {
        return { route: subRoute[0], hash: subRoute[0].hash, isSubRoute: true };
      }
      return { route: route, hash: route.hash, isSubRoute: false };
    }
  }]);

  return Router;
}();

exports.default = Router;