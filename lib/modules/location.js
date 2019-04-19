"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <h4> Musicians from ", "\n      <ul id=\"related-artists\" class=\"cards\">\n        ", "\n      </ul>\n      "], ["\n      <h4> Musicians from ", "\n      <ul id=\"related-artists\" class=\"cards\">\n        ", "\n      </ul>\n      "]),
    _templateObject2 = _taggedTemplateLiteral(["\n        <div id=\"playlist\">\n          <section class=\"cards-header\">\n            <h4> Musicians from ", "</h4>\n          </section>\n          <ul class=\"cards\">\n          </ul>\n        </div>\n        "], ["\n        <div id=\"playlist\">\n          <section class=\"cards-header\">\n            <h4> Musicians from ", "</h4>\n          </section>\n          <ul class=\"cards\">\n          </ul>\n        </div>\n        "]);

var _createDom = require("../helpers/create-dom");

var _memoize = require("../helpers/memoize");

var _eachTemplate = require("../helpers/each-template");

var _ifTemplate = require("../helpers/if-template");

var _addToStorage = require("../helpers/add-to-storage");

var _app = require("../app");

var _arrays = require("../helpers/arrays");

var _strings = require("../helpers/strings");

var _playlistCard = require("./playlist-card");

var _playlistCard2 = _interopRequireDefault(_playlistCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var playlistCard = new _playlistCard2.default();
var innerLimit = 0;
var outerLimit = 50;
//TODO: Need to add album and track class/components to support linking.

var Location = function () {
    function Location() {
        _classCallCheck(this, Location);
    }

    _createClass(Location, [{
        key: "fetchLocationArtists",
        value: function fetchLocationArtists(lat_lng, params) {
            var paramsStr = void 0;
            if (params) {
                paramsStr = (0, _strings.normalizeParams)(params, "_", "or", "spotify");
            }
            if (lat_lng) {
                var splitter = lat_lng.split(",");
                var lat = splitter[0];
                var lng = splitter[1];
                var url = paramsStr ? _app.baseUrl + "/artistsMultiple/and~Lat:" + lat + "_Lng:" + lng + "_" + paramsStr + "?limit=50" : _app.baseUrl + "/artistsMultiple/and~Lat:" + lat + "_Lng:" + lng + "?limit=50";
                var hash = paramsStr ? "/location/" + lat_lng + "/artists_" + paramsStr + "/" : "/location/" + lat_lng + "/artists/";
                var data = (0, _memoize.memoizeJSON)({
                    key: hash,
                    fn: function fn() {
                        return fetch(url);
                    }
                });
                (0, _addToStorage.addToStorage)("hash", hash);
                return data;
            }
        }
    }, {
        key: "fetchCityArtists",
        value: function fetchCityArtists(city, params) {
            var paramsStr = void 0;
            if (params) {
                paramsStr = (0, _strings.normalizeParams)(params, "_", "or", "spotify");
            }
            var url = paramsStr ? _app.baseUrl + "/artistsMultiple/and~City:" + city + "_" + paramsStr + "?limit=50" : _app.baseUrl + "/artistsMultiple/and~City:" + city + "?limit=50";
            var hash = paramsStr ? "/city/" + city + "/artists/" + params + "/" : "/city/" + city + "/artists/";
            var data = (0, _memoize.memoizeJSON)({
                key: hash,
                fn: function fn() {
                    return fetch(url);
                }
            });
            (0, _addToStorage.addToStorage)("hash", hash);
            return data;
        }
    }, {
        key: "fetchTopTracksFromLocation",
        value: function fetchTopTracksFromLocation(lat_lng, params) {
            var paramsStr = void 0;
            if (params) {
                paramsStr = (0, _strings.normalizeParams)(params, "_", "or", "");
            }
            if (lat_lng) {
                var splitter = lat_lng.split(",");
                var lat = splitter[0];
                var lng = splitter[1];
                var url = paramsStr ? _app.baseUrl + "/topTracksMultiple/and~Lat:" + lat + "_Lng:" + lng + "/params?limit=50" : _app.baseUrl + "/topTracksMultiple/and~Lat:" + lat + "_Lng:" + lng + "?limit=50";
                var hash = paramsStr ? "/location/" + lat_lng + "/tracks/" + params + "/" : "/location/" + lat_lng + "/tracks/";
                var data = (0, _memoize.memoizeJSON)({
                    key: hash,
                    fn: function fn() {
                        return fetch(url);
                    }
                });
                (0, _addToStorage.addToStorage)("hash", hash);
                return data;
            }
        }
    }, {
        key: "fetchTopTracksFromCity",
        value: function fetchTopTracksFromCity(city, params) {
            var paramsStr = void 0;
            if (params) {
                paramsStr = (0, _strings.normalizeParams)(params, "_", "or", "");
            }
            var url = paramsStr ? _app.baseUrl + "/topTracksMultiple/and~City:" + city + "_" + paramsStr + "?limit=50" : _app.baseUrl + "/topTracksMultiple/and~City:" + city + "?limit=50";
            var hash = paramsStr ? "/city/" + city + "/tracks" + params + "/" : "/city/" + city + "/tracks/";
            var data = (0, _memoize.memoizeJSON)({
                key: hash,
                fn: function fn() {
                    return fetch(url);
                }
            });
            (0, _addToStorage.addToStorage)("hash", hash);
            // flatten topTracks from all artists into an array and sort via popularity
            return data;
        }
    }, {
        key: "createCityArtistsDOM",
        value: function createCityArtistsDOM(data) {
            var dom = (0, _ifTemplate.iff)(data.length > 0, (0, _createDom.escapeTemplate)(_templateObject, data[0].City, (0, _eachTemplate.each)({
                data: data,
                tag: "li",
                txt: '<a href="#/artist/{{Name}}">{{Name}}</a>',
                attrs: {
                    class: "related-artist",
                    id: null,
                    style: "background-image:url({{spotify.images[0].url}})"
                }
            })), "<p><strong>There are no artists related</strong</p>");
            (0, _createDom.createDOM)({ html: dom, tag: "#container", clear: true });
        }
    }, {
        key: "createCityMapDOM",
        value: function createCityMapDOM(data) {
            var mapData = { data: data, tag: "#container" };
            _app.map.buildMap(mapData, true);
        }
    }, {
        key: "createCityTracksDOM",
        value: function createCityTracksDOM(data) {
            // take all top tracks and flatten into one big tracks array
            // sort via popularity
            var flattenedData = (0, _arrays.sortArrAsc)((0, _arrays.flattenArrayOfObjects)(data, "topTracks"), "popularity", "num", false);
            var slicedArr = flattenedData.slice(innerLimit, outerLimit);
            var filteredData = data.filter(function (item) {
                return item.topTracks[0] && item.topTracks[0].album;
            });
            var mapData = { data: data, tag: "#container" };
            _app.map.buildMap(mapData, true);
            var dom = (0, _ifTemplate.iff)(data.length > 0, (0, _createDom.escapeTemplate)(_templateObject2, filteredData[0].City), "<p><strong>There are no artists related</strong</p>");
            (0, _createDom.createDOM)({ html: dom, tag: "#container", clear: false });
            slicedArr.forEach(function (item, index) {
                playlistCard.createCard(item);
            });
        }
    }]);

    return Location;
}();

exports.default = Location;