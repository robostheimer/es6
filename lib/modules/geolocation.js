"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n        <div class=\"loader\" id=\"loader\">\n          LOADING...\n        </div>"], ["\n        <div class=\"loader\" id=\"loader\">\n          LOADING...\n        </div>"]);

var _createDom = require("../helpers/create-dom");

var _modalCreate = require("./modal-create");

var _modalCreate2 = _interopRequireDefault(_modalCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var modal = new _modalCreate2.default();
var position = void 0;
navigator.geolocation.getCurrentPosition(function (pos) {
    position = pos.coords;
});
//TODO: Need to add album and track class/components to support linking.

var Geolocation = function () {
    function Geolocation() {
        _classCallCheck(this, Geolocation);
    }

    _createClass(Geolocation, [{
        key: "getGeolocation",
        value: function getGeolocation() {
            // Checks if Geolocation is available;
            // If it is is runs the handle_geolocation_query or the handle Gelocation.handle)errors function if access to the Geolocation API is denied by the user
            var geolocation = function geolocation() {
                var loaderDom = (0, _createDom.escapeTemplate)(_templateObject); //make this a dom component that can be added
                // modal.createModal();
                (0, _createDom.createDOM)({ html: loaderDom, tag: "#container" });
                return new Promise(function (resolve, reject) {
                    resolve(position);
                    reject({
                        position: { latitude: 51.506325, longitude: -0.127144 }
                    });
                });
            };
            return geolocation();
        }
    }]);

    return Geolocation;
}();

exports.default = Geolocation;