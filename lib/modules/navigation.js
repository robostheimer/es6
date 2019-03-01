"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <nav\n      class=\"navigation_holder\">\n      <ul class=\"nav_ul\">\n        ", "\n      </ul>\n    </nav>"], ["\n      <nav\n      class=\"navigation_holder\">\n      <ul class=\"nav_ul\">\n        ", "\n      </ul>\n    </nav>"]);

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
    key: "getHash",
    value: function getHash() {
      return _app.router.getHash();
    }
  }, {
    key: "getCity",
    value: function getCity() {
      var hash = this.getHash();
      var city = hash.split("/")[2];
      if (city === "" || undefined) {
        city = sessionStorage.hash.split("/")[2];
      }
      return city;
    }
  }, {
    key: "getParams",
    value: function getParams() {
      var hash = this.getHash();
      var params = hash.split("/");

      if (params === "" || undefined) {
        params = sessionStorage.hash.split("/");
      }

      return params[params.length - 1].indexOf("=") > -1 || params[params.length - 1].indexOf(":") > -1 ? params[params.length - 1] : undefined;
    }
  }, {
    key: "getIcons",
    value: function getIcons() {
      var city = this.getCity();
      var params = this.getParams();
      return [{
        icon: "map",
        type: "link",
        activeClass: "active-ma",
        txt: "<a href=\"" + (0, _ifTemplate.iff)(this.getParams(), "#/city/" + city + "/" + params, "#/city/" + city + "/") + "\">\n          <div class=\"open_div\">\n            <span\n              class=\"" + (0, _ifTemplate.iff)(this.getHash().indexOf("city") > -1 && this.getHash().indexOf("tracks") === -1, "icon iconmap nav-icon active-ma", "icon iconmap nav-icon") + "\"></span>\n          </div>\n              </a >"
      }, {
        icon: "song",
        type: "link",
        activeClass: "active-pl",
        txt: "<a href=\"" + (0, _ifTemplate.iff)(this.getParams(), "#/city/" + city + "/tracks/" + params, "#/city/" + city + "/tracks") + "\">\n          <div class=\"open_div\">\n            <span\n              class=\"" + (0, _ifTemplate.iff)(this.getHash().indexOf("tracks") > -1, "icon iconsong nav-icon active-pl", "icon iconsong nav-icon") + "\"></span>\n          </div>\n              </a >"
      }, {
        icon: "genres",
        type: "button",
        activeClass: "active-ge",
        txt: "<button class= \"open_div\" >\n            <span\n            class=\"icon iconequalizer12 nav-icon\"></span>\n              </button >"
      }, {
        icon: "star",
        type: "link",
        activeClass: "active-fa",
        txt: "<a href=\"#/favorites/\" >\n          <div class=\"open_div\">\n            <span\n              class=\"" + (0, _ifTemplate.iff)(this.getHash().indexOf("favorites") > -1, "icon iconfavorite nav-icon active-fa", "icon iconfavorite nav-icon") + "\"></span>\n          </div>\n              </a >"
      }, {
        icon: "information",
        type: "button",
        activeClass: "active-in",
        txt: "<button class=\"open_div\">\n          <span\n            class=\"icon iconinfo nav-icon\"></span>\n        </button>"
      }];
    }
  }, {
    key: "createNavigationDOM",
    value: function createNavigationDOM() {
      var _this = this;

      var navigationDOM = (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: this.getIcons(),
        tag: "li",
        attrs: { class: "{{icon}}" },
        txt: "{{txt}}"
      }));
      (0, _createDom.createDOM)({ html: navigationDOM, tag: "#nav", clear: true });

      this.changeNavState({ icons: this.getIcons() });

      this.getIcons().forEach(function (item) {
        (0, _action.action)({
          fn: _this.changeNavState,
          tag: "." + item.icon,
          params: { type: item.icon, icons: _this.getIcons() }
        });
      });
    }
  }, {
    key: "changeNavState",
    value: function changeNavState(options) {
      var icons = options.icons;
      var type = options.type;
      var nodes = document.querySelectorAll(".nav-icon");

      // hacky way to get genres to work.  Revisit
      var genreDOM = document.querySelector("#genres");
      if (type === "genres") {
        if (genreDOM.classList.contains("hide")) {
          genreDOM.classList.remove("hide");
        } else {
          genreDOM.classList.add("hide");
        }
      }

      nodes.forEach(function (item, index) {
        var classes = item.getAttribute("class");
        var classesArr = classes.split(" ") || [];
        var toggledClasses = [];
        var isActive = classes.indexOf("active") > -1;

        if (icons[index].icon === type) {
          if (isActive) {
            toggledClasses = classesArr.filter(function (item) {
              return item.indexOf("active") === -1;
            });
          } else {
            classesArr.push(icons[index].activeClass);
            toggledClasses = classesArr;
          }

          classes = toggledClasses.join(" ");
          item.setAttribute("class", classes);
        }
      });
    }
  }]);

  return Navigation;
}();

exports.default = Navigation;