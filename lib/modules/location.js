"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <h4> Musicians from ", "\n      <ul id=\"related-artists\" class=\"cards\">\n        ", "\n      </ul>\n      "], ["\n      <h4> Musicians from ", "\n      <ul id=\"related-artists\" class=\"cards\">\n        ", "\n      </ul>\n      "]),
    _templateObject2 = _taggedTemplateLiteral(["\n        <h4> Musicians from ", "\n        <ul id=\"related-artists\" class=\"cards\">\n          ", "\n        </ul>\n        "], ["\n        <h4> Musicians from ", "\n        <ul id=\"related-artists\" class=\"cards\">\n          ", "\n        </ul>\n        "]);

var _createDom = require("../helpers/create-dom");

var _memoize = require("../helpers/memoize");

var _eachTemplate = require("../helpers/each-template");

var _ifTemplate = require("../helpers/if-template");

var _addToStorage = require("../helpers/add-to-storage");

var _artist = require("./artist");

var _artist2 = _interopRequireDefault(_artist);

var _urls = require("../helpers/urls");

var _strings = require("../helpers/strings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var artist = new _artist2.default();
var baseUrl = "https://api.musicwhereyour.com";

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
        // const ratio = 0.15;
        // const min_lat = parseFloat(lat) - ratio;
        // const max_lat = parseFloat(lat) + ratio;
        // const min_lng = parseFloat(lng) - ratio;
        // const max_lng = parseFloat(lng) + ratio;
        // const baseUrl =
        //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
        // const fusionId = "1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv";
        // const sortBy = "+spotifyPopularity+DESC";
        // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";

        var url = paramsStr ? baseUrl + "/artistsMultiple/and~Lat:" + lat + "_Lng:" + lng + "_" + paramsStr + "?limit=50" : baseUrl + "/artistsMultiple/and~Lat:" + lat + "_Lng:" + lng + "?limit=50";

        var hash = paramsStr ? "/location/" + lat_lng + "/artists_" + paramsStr : "/location/" + lat_lng + "/artists";
        var data = (0, _memoize.memoizeJSON)({
          key: "tracks_" + lat_lng,
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
      // const baseUrl =
      //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
      // const selectedCols = "*";
      // const matchType = "CONTAINS IGNORING CASE";
      // const sortBy = "Order By spotifyPopularity+DESC";
      // const fusionId = "1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv";
      // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
      // const where = "City";
      // const whereQuery = city;
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
      var url = paramsStr ? baseUrl + "/artistsMultiple/and~City:" + city + "_" + paramsStr + "?limit=50" : baseUrl + "/artistsMultiple/and~City:" + city + "?limit=50";
      var hash = paramsStr ? "/city/" + city + "/artists/" + params : "/city/" + city + "/artists";

      var data = (0, _memoize.memoizeJSON)({
        key: city,
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
        paramsStr = (0, _strings.normalizeParams)(params, "_", "or");
      }
      if (lat_lng) {
        var splitter = lat_lng.split(",");
        var lat = splitter[0];
        var lng = splitter[1];
        // const ratio = 0.15;
        // const min_lat = parseFloat(lat) - ratio;
        // const max_lat = parseFloat(lat) + ratio;
        // const min_lng = parseFloat(lng) - ratio;
        // const max_lng = parseFloat(lng) + ratio;
        // const baseUrl =
        //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
        // const fusionId = "1b9_3oSaFIp_afMrbASc48DUTTyA2N4V2Xwg4TYC1";
        // const sortBy = "+topTracksPopularity0+DESC";
        // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
        // const limit = 100;

        var url = paramsStr ? baseUrl + "/topTracksMultiple/and~Lat:" + lat + "_Lng:" + lng + "/params?limit=50" : baseUrl + "/topTracksMultiple/and~Lat:" + lat + "_Lng:" + lng + "?limit=50";
        var hash = paramsStr ? "/location/" + lat_lng + "/tracks/" + params : "/location/" + lat_lng + "/tracks";
        var data = (0, _memoize.memoizeJSON)({
          key: "tracks_" + lat_lng,
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
        paramsStr = (0, _strings.normalizeParams)(params, "_", "or");
      }
      // paramsObj.city = [city];
      // if (city) {
      //   const selectedCols = "*";
      //   const baseUrl =
      //     "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
      //   const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
      //   const query = buildComplexQuery(paramsObj);
      //   const fusionId = "1b9_3oSaFIp_afMrbASc48DUTTyA2N4V2Xwg4TYC1";
      //   const sortBy = "Order By topTracksPopularity0+DESC";
      //   const limit = 100;
      //   const options = {
      //     baseUrl,
      //     fusionId,
      //     selectedCols,
      //     key,
      //     sortBy,
      //     query,
      //     limit
      //   };
      //const url = buildComplexFusionUrl(options);
      var url = paramsStr ? baseUrl + "/topTracksMultiple/and~City:" + city + "_" + paramsStr + "?limit=50" : baseUrl + "/topTracksMultiple/and~City:" + city + "?limit=50";
      var hash = paramsStr ? "/city/" + city + "/tracks" + params : "/city/" + city + "/tracks";
      var data = (0, _memoize.memoizeJSON)({
        key: params ? "tracks_" + city + "_" + paramsStr : "tracks_" + city,
        fn: function fn() {
          return fetch(url);
        }
      });
      (0, _addToStorage.addToStorage)("hash", hash);

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
      (0, _createDom.createDOM)({ html: dom, tag: "container", clear: true });
    }
  }, {
    key: "createCityTracksDOM",
    value: function createCityTracksDOM(data) {
      // let resolvedData = data.data.map(item => {
      //   return createArrayFromFusionData(item, "topTracks", 20, [
      //     "Name",
      //     "Sid",
      //     "Lat",
      //     "Lng",
      //     "City",
      //     "genres0",
      //     "genres1",
      //     "genres2",
      //     "genres3",
      //     "genres4"
      //   ]);
      // }); //need to debug the createArrayFromFusionData method
      // let flattenedArr = flatten(resolvedData);
      // let sortedData = removeDuplicatesArrObj(
      //   sortObjDsc(flattenedArr, "topTracksPopularity", "str", true),
      //   "topTracksId"
      // );
      //console.log(data);
      var filteredData = data.filter(function (item) {
        return item.topTracks[0] && item.topTracks[0].album;
      });
      var dom = (0, _ifTemplate.iff)(data.length > 0, (0, _createDom.escapeTemplate)(_templateObject2, filteredData[0].City, (0, _eachTemplate.each)({
        data: filteredData,
        tag: "li",
        txt: '<div><a href="{{topTracks[0].name}}">{{topTracks[0].name}}</a></div><div>By <a href="#/artist/{{Name}}">{{Name}}</a></div>',
        attrs: {
          class: "related-artist",
          id: null,
          style: "background-image:url({{topTracks[0].album.images[0].url}})"
        }
      })), "<p><strong>There are no artists related</strong</p>");
      (0, _createDom.createDOM)({ html: dom, tag: "container", clear: true });
    }
  }]);

  return Location;
}();

exports.default = Location;