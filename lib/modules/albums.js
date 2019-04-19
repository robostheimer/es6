"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <h2>Tracklist for ", " by ", "</h2>\n      <ul id=\"top-tracks\">\n        ", "\n      </ul>\n      "], ["\n      <h2>Tracklist for ", " by ", "</h2>\n      <ul id=\"top-tracks\">\n        ", "\n      </ul>\n      "]),
    _templateObject2 = _taggedTemplateLiteral(["\n    <h2>Albums by: ", "</h2>\n      <ul id=\"top-tracks\" class=\"cards\">\n        ", "\n      </ul>\n      "], ["\n    <h2>Albums by: ", "</h2>\n      <ul id=\"top-tracks\" class=\"cards\">\n        ", "\n      </ul>\n      "]);

var _createDom = require("../helpers/create-dom");

var _eachTemplate = require("../helpers/each-template");

var _memoize = require("../helpers/memoize");

var _addToStorage = require("../helpers/add-to-storage");

var _createPlaylist = require("./create-playlist");

var _createPlaylist2 = _interopRequireDefault(_createPlaylist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCOPE = "playlist-modify-private playlist-modify-public";
var CLIENT_ID = "6e385b2a58fa42f6832a3a0bc3152c23";
var auth_header = new Headers({
    Authorization: "Bearer " + sessionStorage.access_token
});
var createPlaylist = new _createPlaylist2.default();
//TODO: Some problems with memoization -- NEED TO FIX

var Album = function () {
    function Album() {
        _classCallCheck(this, Album);
    }

    _createClass(Album, [{
        key: "hasBackup",
        value: function hasBackup() {
            return true;
        }
    }, {
        key: "fetchAlbum",
        value: function fetchAlbum(id, name) {
            var baseUrl = "https://api.musicwhereyour.com";
            var route = "albumsMultiple/and~albums.id:";
            var url = baseUrl + "/" + route + id;
            //const url = `https://api.spotify.com/v1/albums/${id}/tracks`;
            if (id) {
                var data = (0, _memoize.memoizeJSON)({
                    key: "album_" + id,
                    fn: function fn() {
                        return fetch(url);
                    }
                });
                if (name) {
                    (0, _addToStorage.addToStorage)("hash", "/album_" + id);
                } else {
                    window.location.hash = "#/" + sessionStorage.hash; // TODO: funnel this through the Router
                }
                return data;
            }
        }
    }, {
        key: "fetchAllAlbums",
        value: function fetchAllAlbums(artist_id) {
            // const baseUrl =
            //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
            // const selectedCols = "*";
            // const matchType = "CONTAINS IGNORING CASE";
            // const sortBy = "";
            // const fusionId = "1rKOhgBT3w70yHl2eR4hc66Zxxyw06CK3ZlPolNie"; //e;
            // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
            // const where = "Sid";
            // const whereQuery = artist_id;
            // const options = {
            //   baseUrl,
            //   fusionId,
            //   selectedCols,
            //   key,
            //   matchType,
            //   sortBy,
            //   where,
            //   whereQuery
            // };
            // const url = buildFusionUrl(options);
            var baseUrl = "https://api.musicwhereyour.com";
            var route = "albumsMultiple/and~Sid:";
            var url = baseUrl + "/" + route + artist_id;
            if (artist_id) {
                var data = (0, _memoize.memoizeJSON)({
                    key: "albums_" + artist_id,
                    fn: function fn() {
                        return fetch(url);
                    }
                });
                (0, _addToStorage.addToStorage)("hash", "/albums/" + artist_id + "/");
                return data;
            }
        }
    }, {
        key: "fetchAllAlbumsSpotify",
        value: function fetchAllAlbumsSpotify(artist_id, name) {
            var url = "https://api.spotify.com/v1/artists/" + artist_id + "/albums";
            if (artist_id) {
                var data = (0, _memoize.memoizeJSON)({
                    key: "albums_" + artist_id,
                    fn: function fn() {
                        return fetch(url, {
                            headers: auth_header
                        });
                    }
                });
                (0, _addToStorage.addToStorage)("hash", "/albums/" + artist_id);
                return data;
            }
        }
    }, {
        key: "createAlbumDOM",
        value: function createAlbumDOM(data) {
            var dom = (0, _createDom.escapeTemplate)(_templateObject, data.albums[0].name, data.Name, (0, _eachTemplate.each)({
                data: data.albums,
                tag: "li",
                txt: "<div>\n                  <strong><a href=\"{{external_urls.spotify}}\" target=\"_blank\">{{name}}</a></strong>\n                </div>\n                ",
                attrs: {
                    class: "track",
                    title: null,
                    id: null
                }
            }));
            // createPlaylist.createSaveButtonDOM(
            //   data.albums,
            //   "songsFromAlbum",
            //   data.name
            // );
            (0, _createDom.createDOM)({ html: dom, tag: "#container", clear: true });
        }
    }, {
        key: "createAlbumsDOM",
        value: function createAlbumsDOM(data, name) {
            var resolvedData = void 0;
            if (data.data) {
                //fusion table data
                resolvedData = (0, _eachTemplate.createArrayFromFusionData)(data.data, "albums", 30);
            } else if (data.spotify) {
                //spotify data
                resolvedData = data.spotify;
            } else {
                resolvedData = data.albums;
            }
            var dom = (0, _createDom.escapeTemplate)(_templateObject2, data.Name, (0, _eachTemplate.each)({
                data: resolvedData,
                tag: "li",
                txt: "<div>\n                  <strong><a href=\"#/album/{{id}}/{{name}}\">{{name}}</a></strong>\n                </div>\n                ",
                attrs: {
                    class: "artist",
                    title: null,
                    id: null,
                    style: "background-image:url({{images[0].url}})"
                }
            }));
            (0, _createDom.createDOM)({ html: dom, tag: "#container", clear: true });
        }
    }]);

    return Album;
}();

exports.default = Album;