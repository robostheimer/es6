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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = window.location.hash.replace('#', '');
var artist = new _artist2.default();
var related = new _relatedArtists2.default();
var album = new _albums2.default();

var routeMap = {
  artist: {
    className: artist,
    hash: 'artist',
    fetch: 'fetchArtists',
    dom: 'createArtistDom'
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
    value: function makeHash(route, id, name) {
      document.getElementById('container').innerHTML = '';
      if (name) {
        window.location.hash = '#/' + route + '/' + id + '/' + name;
      } else {
        window.location.hash = '#/' + route + '/' + id;
      }

      this.hashToData(route, id, name);
    }
  }, {
    key: 'hashToData',
    value: function hashToData(route, id, name) {
      var className = routeMap[route].className;
      var prop = routeMap[route];

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
  }]);

  return Router;
}();

exports.default = Router;