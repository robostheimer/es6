"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _templateObject = _taggedTemplateLiteral(
  [
    "\n      <h4> Musicians from ",
    '\n      <ul id="related-artists" class="cards">\n        ',
    "\n      </ul>\n      "
  ],
  [
    "\n      <h4> Musicians from ",
    '\n      <ul id="related-artists" class="cards">\n        ',
    "\n      </ul>\n      "
  ]
);

var _createDom = require("../helpers/create-dom");

var _eachTemplate = require("../helpers/each-template");

var _memoize = require("../helpers/memoize");

var _ifTemplate = require("../helpers/if-template");

var _addToStorage = require("../helpers/add-to-storage");

var _artist = require("./artist");

var _artist2 = _interopRequireDefault(_artist);

var _urls = require("../helpers/urls");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var artist = new _artist2.default();

//TODO: Need to add album and track class/components to support linking.

var LocationArtists = (function() {
  function LocationArtists() {
    _classCallCheck(this, LocationArtists);
  }

  _createClass(LocationArtists, [
    {
      key: "fetchLocationArtists",
      value: function fetchLocationArtists(lat_lng_ratio) {
        if (lat_lng_ratio) {
          var splitter = lat_lng_ratio.split(",");
          var lat = splitter[0].slice(0, 5);
          var lng = splitter[1].slice(0, 5);
          var ratio = 0.5;
          var min_lat = parseFloat(lat) - ratio;
          var max_lat = parseFloat(lat) + ratio;
          var min_lng = parseFloat(lng) - ratio;
          var max_lng = parseFloat(lng) + ratio;
          var baseUrl =
            "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";

          var url =
            baseUrl +
            "+*+FROM+1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv+WHERE+Lat%20%3E=%20%27" +
            min_lat +
            "%27+And+Lat%20%3C=%20%27" +
            max_lat +
            "%27+And+Lng%3E=" +
            min_lng +
            "+And+Lng%3C=" +
            max_lng +
            "+ORDER%20BY+spotifyPopularity+DESC&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";

          var data = (0, _memoize.memoizeJSON)({
            key: lat_lng_ratio,
            fn: function fn() {
              return fetch(url);
            }
          });
          (0, _addToStorage.addToStorage)("hash", "/location/" + lat_lng_ratio);

          return data;
        }
      }
    },
    {
      key: "fetchCityArtists",
      value: function fetchCityArtists(city) {
        var baseUrl =
          "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
        var selectedCols = "*";
        var matchType = "CONTAINS IGNORING CASE";
        var sortBy = "";
        var fusionId = "1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv";
        var key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
        var where = "City";
        var whereQuery = city;
        var options = {
          baseUrl: baseUrl,
          fusionId: fusionId,
          selectedCols: selectedCols,
          key: key,
          matchType: matchType,
          sortBy: sortBy,
          where: where,
          whereQuery: whereQuery
        };

        var url = (0, _urls.buildFusionUrl)(options);
        debugger;

        //const url = `${baseUrl}+*+FROM+1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv+WHERE+City+CONTAINS%20IGNORING%20CASE%27${city}%27+ORDER%20BY+spotifyPopularity+DESC&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0`

        var data = (0, _memoize.memoizeJSON)({
          key: city,
          fn: function fn() {
            return fetch(url);
          }
        });
        (0, _addToStorage.addToStorage)("hash", "/city/" + city);

        return data;
      }
    },
    {
      key: "fetchTopTracksFromLocation",
      value: function fetchTopTracksFromLocation() {
        debugger;
        //straightforward
        // in put is city, should find matching geolocation and look up via geolocation for better granularity and to avoid dealing with problematic city data
        // genres are attached to artists in spotify so we will have to do 2 lookups in a promise chain, one to artist information and one to top tracks
        // will also need a way to turn genres into arrays
      }
    },
    {
      key: "createCityArtistsDOM",
      value: function createCityArtistsDOM(data) {
        var dom = (0, _ifTemplate.iff)(
          data.data.length > 0,
          (0, _createDom.escapeTemplate)(
            _templateObject,
            data.data[0].City,
            (0, _eachTemplate.each)({
              data: data.data,
              tag: "li",
              txt: '<a href="#/artist/{{Name}}">{{Name}}</a>',
              attrs: {
                class: "related-artist",
                id: null,
                style: "background-image:url({{spotifyImageUrl}})"
              }
            })
          ),
          "<p><strong>There are no artists related</strong</p>"
        );
        (0, _createDom.createDOM)({ html: dom, tag: "container", clear: true });
      }
    }
  ]);

  return LocationArtists;
})();

exports.default = LocationArtists;
