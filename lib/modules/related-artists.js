"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <h4>Similar Bands to ", "</h4>\n      <ul id=\"related-artists\" class=\"cards\">\n        ", "\n      </ul>\n      "], ["\n      <h4>Similar Bands to ", "</h4>\n      <ul id=\"related-artists\" class=\"cards\">\n        ", "\n      </ul>\n      "]);

var _createDom = require("../helpers/create-dom");

var _eachTemplate = require("../helpers/each-template");

var _ifTemplate = require("../helpers/if-template");

var _memoize = require("../helpers/memoize");

var _addToStorage = require("../helpers/add-to-storage");

var _urls = require("../helpers/urls");

var _app = require("../app");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var auth_header = new Headers({
  Authorization: "Bearer " + sessionStorage.access_token
});

var RelatedArtists = function () {
  function RelatedArtists() {
    _classCallCheck(this, RelatedArtists);
  }

  _createClass(RelatedArtists, [{
    key: "hasBackup",
    value: function hasBackup() {
      return true;
    }

    //TODO: memoize this method; see javascript ninja book

  }, {
    key: "fetchRelatedArtists",
    value: function fetchRelatedArtists(id, name) {
      // const baseUrl =
      //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
      // const selectedCols = "*";
      // const matchType = "CONTAINS IGNORING CASE";
      // const sortBy = "";
      // const fusionId = "1C3pHT7Atw56oCceuNXvFiAv3a9msAAMTj5DwCJ4D";
      // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
      // const where = "Sid";
      // const whereQuery = id;

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

      //const url = buildFusionUrl(options);

      var route = "relatedMultiple/and~Sid:";
      var url = _app.baseUrl + "/" + route + id;
      if (id) {
        var data = (0, _memoize.memoizeJSON)({
          key: "related_" + id,
          fn: function fn() {
            return fetch(url);
          }
        });
        (0, _addToStorage.addToStorage)("hash", "/related/" + id);
        return data;
      }
    }
  }, {
    key: "fetchRelatedArtistsSpotify",
    value: function fetchRelatedArtistsSpotify(id, name) {
      var url = "https://api.spotify.com/v1/artists/" + id + "/related-artists";

      var data = (0, _memoize.memoizeJSON)({
        key: id,
        fn: function fn() {
          return fetch(url, {
            headers: auth_header
          });
        }
      });
      (0, _addToStorage.addToStorage)("hash", "/related/" + id);
      return data;
    }
  }, {
    key: "createRelatedArtistsDom",
    value: function createRelatedArtistsDom(data) {
      var resolvedData = void 0;
      if (data.data) {
        //fusion table data
        resolvedData = (0, _eachTemplate.createArrayFromFusionData)(data.data, "related", 20);
      } else if (data.spotify) {
        //spotify data
        resolvedData = data.spotify;
      } else if (data[0].related) {
        resolvedData = data[0].related;
      }

      var dom = (0, _ifTemplate.iff)(resolvedData.length > 0, (0, _createDom.escapeTemplate)(_templateObject, data.Name, (0, _eachTemplate.each)({
        data: resolvedData,
        tag: "li",
        txt: '<a href="#/artist/{{name}}">{{name}}</a>',
        attrs: {
          class: "related-artist",
          id: null,
          style: "background-image:url({{images[0].url}})"
        }
      })), "<p><strong>There are no artists related</strong</p>");
      (0, _createDom.createDOM)({ html: dom, tag: "#container", clear: true });
    }
  }]);

  return RelatedArtists;
}();

exports.default = RelatedArtists;