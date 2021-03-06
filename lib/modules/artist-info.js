"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <div>\n        <img src=\"", "\" alt=\"", "\"/>\n      </div>\n      <div>\n        <p>", "</p>\n      </div>\n\n      "], ["\n      <div>\n        <img src=\"", "\" alt=\"", "\"/>\n      </div>\n      <div>\n        <p>", "</p>\n      </div>\n\n      "]);

var _createDom = require("../helpers/create-dom");

var _ifTemplate = require("../helpers/if-template");

var _memoize = require("../helpers/memoize");

var _addToStorage = require("../helpers/add-to-storage");

var _artist = require("./artist");

var _artist2 = _interopRequireDefault(_artist);

var _modalCreate = require("./modal-create");

var _modalCreate2 = _interopRequireDefault(_modalCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var artist = new _artist2.default();
var modal = new _modalCreate2.default();

var ArtistInfo = function () {
    function ArtistInfo() {
        _classCallCheck(this, ArtistInfo);
    }

    _createClass(ArtistInfo, [{
        key: "fetchArtistInfo",
        value: function fetchArtistInfo() {
            var artistname = arguments.length <= 1 ? undefined : arguments[1];
            var url = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistname + "&api_key=1f91c93293d618de5c30f8cfe2e9f5e9&format=json";
            var data = (0, _memoize.memoizeJSON)({
                key: artistname + "_info",
                fn: function fn() {
                    return fetch(url);
                }
            });
            return data;
        }
    }, {
        key: "createInfoDOM",
        value: function createInfoDOM(data) {
            (0, _createDom.clearDOM)(".artist-modal");
            modal.createModal({ title: data.artist.name });
            var infoDom = (0, _ifTemplate.iff)(data.artist.bio.summary, (0, _createDom.escapeTemplate)(_templateObject, data.artist.image[2]["#text"], data.artist.name, data.artist.bio.summary), "<p><strong>There are no artists related</strong</p>");
            // createDOM({ html: modalDom, tag: 'container' });
            (0, _addToStorage.addToStorage)("hash", "/artist/info/" + name);
            (0, _createDom.createDOM)({ html: infoDom, tag: "#modal-container", clear: true });
        }
    }]);

    return ArtistInfo;
}();

exports.default = ArtistInfo;