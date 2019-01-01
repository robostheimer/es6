"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <div id=\"map\" style=\"height: 90vh;\">\n      </div>"], ["\n      <div id=\"map\" style=\"height: 90vh;\">\n      </div>"]);

var _createDom = require("../helpers/create-dom");

var _geolocation = require("./geolocation");

var _geolocation2 = _interopRequireDefault(_geolocation);

var _location = require("./location");

var _location2 = _interopRequireDefault(_location);

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var geolocation = new _geolocation2.default();
var location = new _location2.default();

var Map = function () {
  function Map() {
    _classCallCheck(this, Map);
  }

  _createClass(Map, [{
    key: "fetchGeolocation",
    value: function fetchGeolocation() {
      var _this = this;

      return geolocation.getGeolocation().then(function (options) {
        if (options) {
          return _this.fetchTopTracksFromLocation(options.latitude + "," + options.longitude).then(function (data) {
            var mapMarkers = _this.sortMarkers(data);
            var options = { tag: "#container", data: data };
            return options;
          });
        }
        var position = {
          position: { latitude: 51.506325, longitude: -0.127144 },
          tag: "#container"
        };

        return _this.fetchTopTracksFromLocation(position.position.latitude + "," + position.position.longitude).then(function (data) {
          var mapMarkers = _this.sortMarkers(data);
          var options = { tag: "#container", data: data };
          return options;
        });
      });
    }
  }, {
    key: "fetchTopTracksFromLocation",
    value: function fetchTopTracksFromLocation(position) {
      return location.fetchTopTracksFromLocation(position).then(function (data) {
        return data;
      });
    }
  }, {
    key: "buildMap",
    value: function buildMap(data) {
      var clearMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (clearMap && markers) {
        markers.forEach(function (item) {
          map.removeLayer(item);
        });
      }

      var mapDom = (0, _createDom.escapeTemplate)(_templateObject);
      var lat = data.data[0].Lat;
      var lng = data.data[0].Lng;
      var container = data.tag;
      var songs = data.data;
      var markers = [];
      var marker_content = void 0;
      if (_app.router.getHash().indexOf("map") > -1) {
        _app.router.setHash("#/map/" + songs[0].City);
      }

      (0, _createDom.createDOM)({ html: mapDom, tag: container, clear: clearMap });
      var map = L.map("map").setView([lat, lng], 10);
      var icon = L.icon({
        iconUrl: "/assets/genre_icons/marker_sm.svg"
      });
      var circle = L.circle([lat, lng], 125, {
        color: "#c53526",
        fillColor: "#c53526",
        fillOpacity: 0.15
      }).addTo(map);

      var combinedLocations = this.sortMarkers(songs);
      for (var p in combinedLocations) {
        console.log(combinedLocations[p].songsStr);
        L.marker([combinedLocations[p][0].Lat, combinedLocations[p][0].Lng], {
          icon: icon
        }).bindPopup(combinedLocations[p].songsStr).addTo(map);
      }

      L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}", {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: "abcd",
        minZoom: 0,
        maxZoom: 20,
        center: [50, 20],
        animate: true,
        ext: "png"
      }).addTo(map);

      map.scrollWheelZoom.disable();
      map.zoomControl.options.position = "topright";
    }
  }, {
    key: "sortMarkers",
    value: function sortMarkers(data) {
      return data.reduce(function (accum, song) {
        var latLng = song.Lat + "_" + song.Lng;
        if (accum[latLng]) {
          accum[latLng].push(song);
          if (song.topTracks.length) {
            accum[latLng].songsStr += "\n            <h4>" + song.City + "</h4>\n            <div class=\"popup-artist-name\">" + song.Name + "</div>\n            <div class=\"popup-song-name\">" + song.topTracks[0].name + "</div>\n          ";
          }
        } else {
          accum[latLng] = [];
          accum[latLng].songsStr = "";
          if (song.topTracks.length) {
            accum[latLng].songsStr += "\n          <h4>" + song.City + "</h4>\n          <div class=\"popup-artist-name\">" + song.Name + "</div>\n          <div class=\"popup-song-name\">" + song.topTracks[0].name + "</div>\n        ";
          }

          accum[latLng].push(song);
        }
        return accum;
      }, {});
    }
  }]);

  return Map;
}();

exports.default = Map;