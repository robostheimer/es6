'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <h4> Musicians from ', '\n      <ul id="related-artists" class="cards">\n        ', '\n      </ul>\n      '], ['\n      <h4> Musicians from ', '\n      <ul id="related-artists" class="cards">\n        ', '\n      </ul>\n      ']),
    _templateObject2 = _taggedTemplateLiteral(['\n        <h4> Musicians from ', '\n        <ul id="related-artists" class="cards">\n          ', '\n        </ul>\n        '], ['\n        <h4> Musicians from ', '\n        <ul id="related-artists" class="cards">\n          ', '\n        </ul>\n        ']);

var _createDom = require('../helpers/create-dom');

var _memoize = require('../helpers/memoize');

var _eachTemplate = require('../helpers/each-template');

var _arrays = require('../helpers/arrays');

var _strings = require('../helpers/strings');

var _ifTemplate = require('../helpers/if-template');

var _addToStorage = require('../helpers/add-to-storage');

var _artist = require('./artist');

var _artist2 = _interopRequireDefault(_artist);

var _urls = require('../helpers/urls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var artist = new _artist2.default();

//TODO: Need to add album and track class/components to support linking.

var Location = function () {
  function Location() {
    _classCallCheck(this, Location);
  }

  _createClass(Location, [{
    key: 'fetchLocationArtists',
    value: function fetchLocationArtists(lat_lng) {
      if (lat_lng) {
        var splitter = lat_lng.split(',');
        var lat = splitter[0].slice(0, 5);
        var lng = splitter[1].slice(0, 5);
        var ratio = 0.15;
        var min_lat = parseFloat(lat) - ratio;
        var max_lat = parseFloat(lat) + ratio;
        var min_lng = parseFloat(lng) - ratio;
        var max_lng = parseFloat(lng) + ratio;
        var baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
        var fusionId = '1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv';
        var sortBy = '+spotifyPopularity+DESC';
        var key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

        var url = baseUrl + '+*+FROM+' + fusionId + '+WHERE+Lat%20%3E=%20%27' + min_lat + '%27+And+Lat%20%3C=%20%27' + max_lat + '%27+And+Lng%3E=' + min_lng + '+And+Lng%3C=' + max_lng + '+ORDER%20BY' + sortBy + '&key=' + key;

        var data = (0, _memoize.memoizeJSON)({
          key: 'tracks_' + lat_lng,
          fn: function fn() {
            return fetch(url);
          }
        });
        (0, _addToStorage.addToStorage)('hash', '/location/' + lat_lng + '/artists');

        return data;
      }
    }
  }, {
    key: 'fetchCityArtists',
    value: function fetchCityArtists(city) {
      var baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
      var selectedCols = '*';
      var matchType = 'CONTAINS IGNORING CASE';
      var sortBy = 'Order By spotifyPopularity+DESC';
      var fusionId = '1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv';
      var key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
      var where = 'City';
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

      //const url = `${baseUrl}+*+FROM+1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv+WHERE+City+CONTAINS%20IGNORING%20CASE%27${city}%27+ORDER%20BY+spotifyPopularity+DESC&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0`

      var data = (0, _memoize.memoizeJSON)({
        key: city,
        fn: function fn() {
          return fetch(url);
        }
      });
      (0, _addToStorage.addToStorage)('hash', '/city/' + city + '/artists');

      return data;
    }
  }, {
    key: 'fetchTopTracksFromLocation',
    value: function fetchTopTracksFromLocation(lat_lng) {
      if (lat_lng) {
        var splitter = lat_lng.split(',');
        var lat = splitter[0].slice(0, 5);
        var lng = splitter[1].slice(0, 5);
        var ratio = 0.15;
        var min_lat = parseFloat(lat) - ratio;
        var max_lat = parseFloat(lat) + ratio;
        var min_lng = parseFloat(lng) - ratio;
        var max_lng = parseFloat(lng) + ratio;
        var baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
        var fusionId = '1b9_3oSaFIp_afMrbASc48DUTTyA2N4V2Xwg4TYC1';
        var sortBy = '+topTracksPopularity0+DESC';
        var key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
        var limit = 100;

        var url = baseUrl + '+*+FROM+' + fusionId + '+WHERE+Lat%20%3E=%20' + min_lat + '+And+Lat%20%3C=%20' + max_lat + '+And+Lng%3E=' + min_lng + '+And+Lng%3C=' + max_lng + '+ORDER%20BY' + sortBy + '+LIMIT+' + limit + '&key=' + key;

        var data = (0, _memoize.memoizeJSON)({
          key: 'tracks_' + lat_lng,
          fn: function fn() {
            return fetch(url);
          }
        });
        (0, _addToStorage.addToStorage)('hash', '/location/' + lat_lng + '/tracks');

        return data;
      }
    }
  }, {
    key: 'fetchTopTracksFromCity',
    value: function fetchTopTracksFromCity(city, params) {
      var paramsObj = (0, _strings.normalizeParams)(params, '&', 'Or');

      paramsObj.city = [city];
      if (city) {
        var selectedCols = '*';
        var baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
        var key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
        var query = (0, _urls.buildComplexQuery)(paramsObj);
        var fusionId = '1b9_3oSaFIp_afMrbASc48DUTTyA2N4V2Xwg4TYC1';
        var sortBy = 'Order By topTracksPopularity0+DESC';
        var limit = 100;
        var options = {
          baseUrl: baseUrl,
          fusionId: fusionId,
          selectedCols: selectedCols,
          key: key,
          sortBy: sortBy,
          query: query,
          limit: limit
        };
        var url = (0, _urls.buildComplexFusionUrl)(options);

        var data = (0, _memoize.memoizeJSON)({
          key: params ? 'tracks_' + city + '_' + params : 'tracks_' + city,
          fn: function fn() {
            return fetch(url);
          }
        });
        (0, _addToStorage.addToStorage)('hash', '/city/' + city + '/tracks/' + (params || ''));

        return data;
      }
    }
  }, {
    key: 'createCityArtistsDOM',
    value: function createCityArtistsDOM(data) {
      var dom = (0, _ifTemplate.iff)(data.data.length > 0, (0, _createDom.escapeTemplate)(_templateObject, data.data[0].City, (0, _eachTemplate.each)({
        data: data.data,
        tag: 'li',
        txt: '<a href="#/artist/{{Name}}">{{Name}}</a>',
        attrs: {
          class: 'related-artist',
          id: null,
          style: 'background-image:url({{spotifyImageUrl}})'
        }
      })), '<p><strong>There are no artists related</strong</p>');
      (0, _createDom.createDOM)({ html: dom, tag: 'container', clear: true });
    }
  }, {
    key: 'createCityTracksDOM',
    value: function createCityTracksDOM(data) {
      var resolvedData = data.data.map(function (item) {
        return (0, _eachTemplate.createArrayFromFusionData)(item, 'topTracks', 20, ['Name', 'Sid', 'Lat', 'Lng', 'City', 'genres0', 'genres1', 'genres2', 'genres3', 'genres4']);
      }); //need to debug the createArrayFromFusionData method
      var flattenedArr = (0, _arrays.flatten)(resolvedData);
      var sortedData = (0, _arrays.removeDuplicatesArrObj)((0, _arrays.sortObjDsc)(flattenedArr, 'topTracksPopularity', 'str', true), 'topTracksId');

      var dom = (0, _ifTemplate.iff)(sortedData.length > 0, (0, _createDom.escapeTemplate)(_templateObject2, sortedData[0].City, (0, _eachTemplate.each)({
        data: sortedData,
        tag: 'li',
        txt: '<div><a href="{{topTracksName}}">{{topTracksName}}</a></div><div>By <a href="#/artist/{{Name}}">{{Name}}</a></div>',
        attrs: {
          class: 'related-artist',
          id: null,
          style: 'background-image:url({{topTracksAlbumImagesUrl}})'
        }
      })), '<p><strong>There are no artists related</strong</p>');
      (0, _createDom.createDOM)({ html: dom, tag: 'container', clear: true });
    }
  }]);

  return Location;
}();

exports.default = Location;