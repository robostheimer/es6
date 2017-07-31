'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//import { each } from '../helpers/each-template';


var _templateObject = _taggedTemplateLiteral(['\n      <div id="map" style="height: 200px;">\n      </div>'], ['\n      <div id="map" style="height: 200px;">\n      </div>']);

var _createDom = require('../helpers/create-dom');

var _ifTemplate = require('../helpers/if-template');

var _memoize = require('../helpers/memoize');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import { addToStorage } from '../helpers/add-to-storage';

//TODO: Need to add album and track class/components to support linking.
var Map = function () {
  function Map() {
    _classCallCheck(this, Map);
  }

  _createClass(Map, [{
    key: 'buildMap',
    value: function buildMap(lat, lng, container) {
      var mapDom = (0, _createDom.escapeTemplate)(_templateObject);

      (0, _createDom.createDOM)({ html: mapDom, tag: container, clear: true });
      var map = L.map('map').setView([lat, lng], 14);

      var circle = L.circle([lat, lng], 125, {
        color: '#428bca',
        fillColor: '#428bca',
        fillOpacity: 0.15
      }).addTo(map);

      L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        center: [50, 20],
        animate: true,
        ext: 'png'
      }).addTo(map);
    }
  }]);

  return Map;
}();

exports.default = Map;