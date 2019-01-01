"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <nav\n      class=\"navigation_holder\">\n      <ul class=\"nav_ul\">\n        ", "\n      </ul>\n    </nav>"], ["\n      <nav\n      class=\"navigation_holder\">\n      <ul class=\"nav_ul\">\n        ", "\n      </ul>\n    </nav>"]);

var _createDom = require("../helpers/create-dom");

var _app = require("../app");

var _onClick = require("../helpers/on-click");

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
      return hash.split("/")[2];
    }
  }, {
    key: "getIcons",
    value: function getIcons() {
      var city = this.getCity();
      return [{
        icon: 'map',
        activeClass: 'active-ma',
        txt: "<a href=\"#/city/" + city + "/\" >\n          <div class=\"open_div\">\n            <span\n              class=\"" + (0, _ifTemplate.iff)(this.getHash().indexOf('tracks') > -1, "icon iconmap nav-icon active-ma", "icon iconmap nav-icon") + "></span>\n          </div>\n              </a >"
      }, {
        icon: 'song',
        activeClass: 'active-pl',
        txt: "<a href=\"#/city/" + city + "/tracks\" >\n          <div class=\"open_div\">\n            <span\n              class=\"" + (0, _ifTemplate.iff)(this.getHash().indexOf('tracks') > -1, "icon iconsong nav-icon active-pl", "icon iconsong nav-icon") + "\"></span>\n          </div>\n              </a >"
      }, {
        icon: 'genres',
        activeClass: 'active-ge',
        txt: "<button class= \"open_div\" >\n            <span\n            class=\"icon iconequalizer12 nav-icon\"></span>\n              </button >"
      }, {
        icon: 'star',
        activeClass: 'active-fa',
        txt: "<a href=\"#/favorites\" >\n          <div class=\"open_div\">\n            <span\n              class=\"icon iconfavorite nav-icon\"></span>\n          </div>\n              </a >"
      }, {
        icon: 'information',
        activeClass: 'active-in',
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
        (0, _onClick.onClick)({
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
      var nodes = document.querySelectorAll('.nav-icon');

      // nodes.forEach((item,index) => {
      //   let classes = item.getAttribute('class');
      //   let classesArr = classes.split(' ');
      //   if(classes.indexOf('active') > -1) {
      //     const filteredClasses = classesArr.filter((item) => {
      //       return item.indexOf('active') === -1;
      //     })
      //     classes = filteredClasses.join(' ');
      //     item.setAttribute('class', classes);
      //   }
      //   if(icons[index].icon === options.type) {
      //     classesArr.push(icons[index].activeClass);
      //     classes = classesArr.join(' ');
      //     item.setAttribute('class', classes);
      //   }
      // });
    }
  }]);

  return Navigation;
}();

exports.default = Navigation;