"use strict";

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
exports.__esModule = true;
var create_dom_1 = require("../helpers/create-dom");
var memoize_1 = require("../helpers/memoize");
var each_template_1 = require("../helpers/each-template");
var if_template_1 = require("../helpers/if-template");
var add_to_storage_1 = require("../helpers/add-to-storage");
var app_1 = require("../app");
var arrays_1 = require("../helpers/arrays");
var strings_1 = require("../helpers/strings");
var playlist_card_1 = require("./playlist-card");
var app_2 = require("../app");
var playlistCard = new playlist_card_1["default"]();
var innerLimit = 0;
var outerLimit = 50;
//TODO: Need to add album and track class/components to support linking.
var Location = /** @class */function () {
    function Location() {}
    Location.prototype.fetchLocationArtists = function (lat_lng, params) {
        var paramsStr;
        if (params) {
            paramsStr = strings_1.normalizeParams(params, "_", "or", "spotify");
        }
        if (lat_lng) {
            var splitter = lat_lng.split(",");
            var lat = splitter[0];
            var lng = splitter[1];
            var url_1 = paramsStr ? app_1.baseUrl + "/artistsMultiple/and~Lat:" + lat + "_Lng:" + lng + "_" + paramsStr + "?limit=50" : app_1.baseUrl + "/artistsMultiple/and~Lat:" + lat + "_Lng:" + lng + "?limit=50";
            var hash = paramsStr ? "/location/" + lat_lng + "/artists_" + paramsStr + "/" : "/location/" + lat_lng + "/artists/";
            var data = memoize_1.memoizeJSON({
                key: hash,
                fn: function fn() {
                    return fetch(url_1);
                }
            });
            add_to_storage_1.addToStorage("hash", hash);
            return data;
        }
    };
    Location.prototype.fetchCityArtists = function (city, params) {
        var paramsStr;
        if (params) {
            paramsStr = strings_1.normalizeParams(params, "_", "or", "spotify");
        }
        var url = paramsStr ? app_1.baseUrl + "/artistsMultiple/and~City:" + city + "_" + paramsStr + "?limit=50" : app_1.baseUrl + "/artistsMultiple/and~City:" + city + "?limit=50";
        var hash = paramsStr ? "/city/" + city + "/artists/" + params + "/" : "/city/" + city + "/artists/";
        var data = memoize_1.memoizeJSON({
            key: hash,
            fn: function fn() {
                return fetch(url);
            }
        });
        add_to_storage_1.addToStorage("hash", hash);
        return data;
    };
    Location.prototype.fetchTopTracksFromLocation = function (lat_lng, params) {
        var paramsStr;
        if (params) {
            paramsStr = strings_1.normalizeParams(params, "_", "or");
        }
        if (lat_lng) {
            var splitter = lat_lng.split(",");
            var lat = splitter[0];
            var lng = splitter[1];
            var url_2 = paramsStr ? app_1.baseUrl + "/topTracksMultiple/and~Lat:" + lat + "_Lng:" + lng + "/params?limit=50" : app_1.baseUrl + "/topTracksMultiple/and~Lat:" + lat + "_Lng:" + lng + "?limit=50";
            var hash = paramsStr ? "/location/" + lat_lng + "/tracks/" + params + "/" : "/location/" + lat_lng + "/tracks/";
            var data = memoize_1.memoizeJSON({
                key: hash,
                fn: function fn() {
                    return fetch(url_2);
                }
            });
            add_to_storage_1.addToStorage("hash", hash);
            return data;
        }
    };
    Location.prototype.fetchTopTracksFromCity = function (city, params) {
        var paramsStr;
        if (params) {
            paramsStr = strings_1.normalizeParams(params, "_", "or");
        }
        var url = paramsStr ? app_1.baseUrl + "/topTracksMultiple/and~City:" + city + "_" + paramsStr + "?limit=50" : app_1.baseUrl + "/topTracksMultiple/and~City:" + city + "?limit=50";
        var hash = paramsStr ? "/city/" + city + "/tracks" + params + "/" : "/city/" + city + "/tracks/";
        var data = memoize_1.memoizeJSON({
            key: hash,
            fn: function fn() {
                return fetch(url);
            }
        });
        add_to_storage_1.addToStorage("hash", hash);
        // flatten topTracks from all artists into an array and sort via popularity
        return data;
    };
    Location.prototype.createCityArtistsDOM = function (data) {
        var dom = if_template_1.iff(data.length > 0, create_dom_1.escapeTemplate(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <h4> Musicians from ", "\n      <ul id=\"related-artists\" class=\"cards\">\n        ", "\n      </ul>\n      "], ["\n      <h4> Musicians from ", "\n      <ul id=\"related-artists\" class=\"cards\">\n        ", "\n      </ul>\n      "])), data[0].City, each_template_1.each({
            data: data,
            tag: "li",
            txt: '<a href="#/artist/{{Name}}">{{Name}}</a>',
            attrs: {
                "class": "related-artist",
                id: null,
                style: "background-image:url({{spotify.images[0].url}})"
            }
        })), "<p><strong>There are no artists related</strong</p>");
        create_dom_1.createDOM({ html: dom, tag: "#container", clear: true });
    };
    Location.prototype.createCityMapDOM = function (data) {
        var mapData = { data: data, tag: "#container" };
        app_2.map.buildMap(mapData, true);
    };
    Location.prototype.createCityTracksDOM = function (data) {
        // take all top tracks and flatten into one big tracks array
        // sort via popularity
        var flattenedData = arrays_1.sortArrAsc(arrays_1.flattenArrayOfObjects(data, "topTracks"), "popularity").map(function (item) {
            item.isFavorited = false;
            return item;
        });
        var slicedArr = flattenedData.slice(innerLimit, outerLimit);
        slicedArr[0].isFavorited = true;
        var filteredData = data.filter(function (item) {
            return item.topTracks[0] && item.topTracks[0].album;
        });
        var mapData = { data: data, tag: "#container" };
        app_2.map.buildMap(mapData, true);
        var dom = if_template_1.iff(data.length > 0, create_dom_1.escapeTemplate(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        <div id=\"playlist\">\n          <section class=\"cards-header\">\n            <h4> Musicians from ", "</h4>\n          </section>\n          <ul class=\"cards\">\n         \n          </ul>\n        </div>\n        "], ["\n        <div id=\"playlist\">\n          <section class=\"cards-header\">\n            <h4> Musicians from ", "</h4>\n          </section>\n          <ul class=\"cards\">\n         \n          </ul>\n        </div>\n        "])), filteredData[0].City), "<p><strong>There are no artists related</strong</p>");
        create_dom_1.createDOM({ html: dom, tag: "#container", clear: false });
        slicedArr.forEach(function (item) {
            playlistCard.createCard(item);
        });
    };
    return Location;
}();
exports["default"] = Location;
var templateObject_1, templateObject_2;