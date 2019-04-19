"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n        <nav\n        class=\"navigation_holder\">\n        <ul class=\"nav_ul\">\n          ", "\n        </ul>\n      </nav>"], ["\n        <nav\n        class=\"navigation_holder\">\n        <ul class=\"nav_ul\">\n          ", "\n        </ul>\n      </nav>"]);

var _createDom = require("../helpers/create-dom");

var _app = require("../app");

var _action = require("../helpers/action");

var _eachTemplate = require("../helpers/each-template");

var _ifTemplate = require("../helpers/if-template");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = function () {
    function Navigation() {
        _classCallCheck(this, Navigation);
    }

    _createClass(Navigation, [{
        key: "_getHash",
        value: function _getHash() {
            return _app.router.getHash();
        }
    }, {
        key: "_getCity",
        value: function _getCity() {
            var hash = this._getHash();
            var city = hash.split("/")[2];
            if (city === "" || undefined) {
                city = sessionStorage.hash.split("/")[2];
            }
            return city;
        }
    }, {
        key: "_getParams",
        value: function _getParams() {
            var hash = this._getHash();
            // this is extremely hacky need to revisit
            if (hash && hash.length && hash[hash.length - 1] === "/") {
                hash = hash.slice(0, hash.length - 1);
            }
            var params = hash.split("/");
            if (!params) {
                params = sessionStorage.hash.split("/");
            }
            var paramsColon = params[params.length - 1].indexOf(":") > -1 ? params[params.length - 1] : undefined;
            var paramsEqual = params[params.length - 1].indexOf("=") > -1 ? params[params.length - 1] : undefined;
            return paramsColon || paramsEqual;
        }
    }, {
        key: "_getIcons",
        value: function _getIcons() {
            var city = this._getCity();
            var hash = this._getHash();
            var params = this._getParams();
            return [{
                icon: "map",
                type: "link",
                txt: "<a href=\"" + (0, _ifTemplate.iff)(params, "#/city/" + city + "/" + params, "#/city/" + city + "/") + "\">\n            <div class=\"open_div\">\n              <span\n                class=\"" + (0, _ifTemplate.iff)(hash.indexOf("city") > -1 && hash.indexOf("tracks") === -1, "icon iconmap nav-icon active", "icon iconmap nav-icon") + "\"></span>\n            </div>\n                </a >"
            }, {
                icon: "song",
                type: "link",
                txt: "<a href=\"" + (0, _ifTemplate.iff)(this._getParams(), "#/city/" + city + "/tracks/" + params + "/", "#/city/" + city + "/tracks/") + "\">\n            <div class=\"open_div\">\n              <span\n                class=\"" + (0, _ifTemplate.iff)(hash.indexOf("tracks") > -1, "icon iconsong nav-icon active", "icon iconsong nav-icon") + "\"></span>\n            </div>\n                </a >"
            }, {
                icon: "genres",
                type: "button",
                txt: "<button class= \"open_div\" >\n              <span\n              class=\"icon iconequalizer12 nav-icon\"></span>\n                </button >"
            }, {
                icon: "star",
                type: "link",
                txt: "<a href=\"#/favorites/\" >\n            <div class=\"open_div\">\n              <span\n                class=\"" + (0, _ifTemplate.iff)(hash.indexOf("favorites") > -1, "icon iconfavorite nav-icon active", "icon iconfavorite nav-icon") + "\"></span>\n            </div>\n                </a >"
            }, {
                icon: "information",
                type: "button",
                txt: "<button class=\"open_div\">\n            <span\n              class=\"icon iconinfo nav-icon\"></span>\n          </button>"
            }];
        }
    }, {
        key: "createNavigationDOM",
        value: function createNavigationDOM() {
            var _this = this;

            var icons = this._getIcons();
            var navigationDOM = (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
                data: icons,
                tag: "li",
                attrs: { class: "{{icon}}" },
                txt: "{{txt}}"
            }));
            (0, _createDom.createDOM)({ html: navigationDOM, tag: "#nav", clear: true });
            this._changeNavState({ icons: icons });
            icons.forEach(function (item) {
                (0, _action.action)({
                    fn: _this._changeNavState,
                    tag: "." + item.icon,
                    params: {
                        type: item.icon,
                        icons: icons,
                        isGenre: item.icon === "genres"
                    }
                });
            });
        }
    }, {
        key: "_changeNavState",
        value: function _changeNavState(options) {
            var icons = options.icons;
            var type = options.type;
            var isGenre = options.isGenre;
            var nodes = document.querySelectorAll(".nav-icon");
            nodes.forEach(function (item, index) {
                var classes = item.getAttribute("class");
                var isActive = classes.indexOf("active") > -1;
                if (icons[index].icon === type) {
                    if (isActive) {
                        item.classList.remove("active");
                    } else {
                        item.classList.add("active");
                    }
                }
            });
            // hacky way to get genres to work.  Revisit
            var genreDOM = document.querySelector("#genres");
            var genreButton = document.querySelector(".open_div .iconequalizer12 ");
            if (isGenre) {
                if (genreDOM.classList.contains("hide") && genreButton.classList.contains("active")) {
                    genreDOM.classList.remove("hide");
                } else {
                    genreDOM.classList.add("hide");
                    genreButton.classList.remove("active");
                }
            } else if (!genreDOM.classList.contains("hide")) {
                genreButton.classList.add("active");
            }
        }
    }]);

    return Navigation;
}();

exports.default = Navigation;