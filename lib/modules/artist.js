"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <ul id=\"artists\" class=\"cards\">\n        ", "\n      </ul>\n    "], ["\n      <ul id=\"artists\" class=\"cards\">\n        ", "\n      </ul>\n    "]),
    _templateObject2 = _taggedTemplateLiteral(["\n      <h2>Top Tracks for ", "</h2>\n      <ul id=\"top-tracks\" class=\"cards\">\n        ", "\n      </ul>\n      "], ["\n      <h2>Top Tracks for ", "</h2>\n      <ul id=\"top-tracks\" class=\"cards\">\n        ", "\n      </ul>\n      "]),
    _templateObject3 = _taggedTemplateLiteral(["\n    <h2>Playlist Inspired by: ", "</h2>\n      <ul id=\"radio\" class=\"cards\">\n        ", "\n      </ul>\n      "], ["\n    <h2>Playlist Inspired by: ", "</h2>\n      <ul id=\"radio\" class=\"cards\">\n        ", "\n      </ul>\n      "]);

var _relatedArtists = require("./related-artists");

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

var _createPlaylist = require("./create-playlist");

var _createPlaylist2 = _interopRequireDefault(_createPlaylist);

var _createDom = require("../helpers/create-dom");

var _eachTemplate = require("../helpers/each-template");

var _memoize = require("../helpers/memoize");

var _addToStorage = require("../helpers/add-to-storage");

var _urls = require("../helpers/urls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var related = new _relatedArtists2.default();
var createPlaylist = new _createPlaylist2.default();
var auth_header = new Headers({
  Authorization: "Bearer " + sessionStorage.access_token
});

var baseUrl = "https://api.musicwhereyour.com";

var Artist = function () {
  function Artist() {
    _classCallCheck(this, Artist);
  }

  _createClass(Artist, [{
    key: "hasBackup",
    value: function hasBackup() {
      return true;
    }
  }, {
    key: "fetchArtists",
    value: function fetchArtists(name) {
      var route = "artistsMatch";
      var url = baseUrl + "/" + route + "/" + name;

      if (name) {
        var data = (0, _memoize.memoizeJSON)({
          key: name,
          fn: function fn() {
            return fetch(url);
          }
        });
        (0, _addToStorage.addToStorage)("hash", "/artist/" + name);
        return data;
      }
    }
  }, {
    key: "fetchArtistsSpotify",
    value: function fetchArtistsSpotify(name) {
      var url = "https://api.spotify.com/v1/search?q=" + name + "&type=artist";
      if (name) {
        var data = (0, _memoize.memoizeJSON)({
          key: name,
          fn: function fn() {
            return fetch(url, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)("hash", "/artist/" + name);
        return data;
      }
    }
  }, {
    key: "fetchTopTracks",
    value: function fetchTopTracks(id) {
      var route = "topTracksMultiple/and~Sid:";
      var url = baseUrl + "/" + route + id;

      if (id) {
        var data = (0, _memoize.memoizeJSON)({
          key: "top_" + id,
          fn: function fn() {
            return fetch(url);
          }
        });
        (0, _addToStorage.addToStorage)("hash", "/top/" + id);
        return data;
      }
    }
  }, {
    key: "fetchTopTracksSpotify",
    value: function fetchTopTracksSpotify(id) {
      var request = "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=US";

      if (id) {
        var data = (0, _memoize.memoizeJSON)({
          key: "top_" + id,
          fn: function fn() {
            return fetch(request, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)("hash", "/top/" + id + "/" + name);
        return data;
      }
    }
  }, {
    key: "fetchRecommendations",
    value: function fetchRecommendations(id) {
      var request = "https://api.spotify.com/v1/recommendations?seed_artists=" + id + "&limit=50";

      if (id) {
        var data = (0, _memoize.memoizeJSON)({
          key: "recs_" + id,
          fn: function fn() {
            return fetch(request, {
              headers: auth_header
            });
          }
        });
        (0, _addToStorage.addToStorage)("hash", "/recommendations/" + id);
        return data;
      }
    }

    //TODO: Try to think about how to abstract this to use for all situations of creating dom
    //perhaps a recursive function of

  }, {
    key: "createArtistDom",
    value: function createArtistDom(data) {
      //, params) {
      (0, _createDom.clearDOM)(".artist-modal");
      var resolvedData = void 0;

      if (data.data) {
        //fusion table data
        resolvedData = data.data;
      } else if (data.spotify) {
        //spotify data
        resolvedData = data.spotify;
      } else {
        resolvedData = data;
      }
      //$('#artists').remove();
      //const action = params.action;
      var dom = (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: resolvedData,
        tag: "li",
        txt: "<div>\n                  <h4><a href=\"#/artist/info/{{Name}}\">{{Name}}</a></h4>\n                </div>\n                <ul class=\"options\">\n                  <li>\n                    <a href=\"#/related/{{Sid}}/\">\n                      Related Musicians\n                    </a>\n                  </li>\n                  <li>\n                    <a href=\"#/top/{{Sid}}\">\n                      Top Tracks\n                    </a>\n                  </li>\n                  <li>\n                    <a href=\"#/albums/{{Sid}}/{{Name}}\">\n                      Albums\n                    </a>\n                  </li>\n                  <li>\n                    <a href=\"#/recommendations/{{Sid}}\">\n                      Create Radio Station\n                    </a>\n                  <li>\n                  <li>\n                    <a href=\"#/city/{{City}}/artists\">\n                      Other musicians from {{City}}\n                    </a>\n                  </li>\n                  <li>\n                    <a href=\"#/city/{{City}}/tracks/genres=\">\n\n                      Hottest Tracks from {{City}}\n                    </a>\n                  </li>\n                </ul>\n                ",
        attrs: {
          class: "artist",
          title: null,
          id: null,
          style: "background-image:url({{spotify.images[0.url}})"
        }
      }));

      (0, _createDom.createDOM)({ html: dom, tag: "container", clear: true });
    }
  }, {
    key: "createTopTracksDOM",
    value: function createTopTracksDOM(data, name) {
      var resolvedData = void 0;

      if (data.data) {
        //fusion table data
        resolvedData = (0, _eachTemplate.createArrayFromFusionData)(data.data, "topTracks", 20);
      } else {
        //spotify data
        resolvedData = data.topTracks;
      }

      var dom = (0, _createDom.escapeTemplate)(_templateObject2, data.Name, (0, _eachTemplate.each)({
        data: resolvedData,
        tag: "li",
        txt: "<div>\n                  <strong><a href=\"{{id}}\" target=\"_blank\">{{name}}</a></strong>\n                </div>\n                <p>\n                  from: <a href=\"#/album/{{album.id}}/{{album.name}}\">{{album.name}}</a>\n                </p>\n                ",
        attrs: {
          class: "artist card",
          title: null,
          id: null,
          style: "background-image:url({{album.images[0].url}})"
        }
      }));
      // Need to update create playlist functionality to play nice with new data structure
      //createPlaylist.createSaveButtonDOM(normalizedData, 'topSongs');
      (0, _createDom.createDOM)({ html: dom, tag: "container", clear: true });
    }
  }, {
    key: "createRecsDOM",
    value: function createRecsDOM(data) {
      var dom = (0, _createDom.escapeTemplate)(_templateObject3, data.tracks[0].artists[0].name, (0, _eachTemplate.each)({
        data: data.tracks,
        tag: "li",
        txt: "<div>\n                  <strong><a href=\"{{external_urls.spotify}}\" target=\"_blank\">{{name}}</a></strong>\n                </div>\n                <p>\n                  Album: <a href=\"#/album/{{album.id}}/{{album.name}}\">{{album.name}}</a>\n                </p>\n                <p>By: <a href=\"#/artist/{{artists[0].name}}\">{{artists[0].name}}</a>\n                ",
        attrs: {
          class: "playlist card",
          title: null,
          id: null,
          style: "background-image:url({{album.images[0].url}})"
        }
      }));
      createPlaylist.createSaveButtonDOM(data.tracks, "radio");
      (0, _createDom.createDOM)({ html: dom, tag: "container", clear: true });
    }
  }]);

  return Artist;
}();

exports.default = Artist;