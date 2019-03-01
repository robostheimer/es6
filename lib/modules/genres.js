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

var _genreIcons = require("../icons/genre-icons");

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
    key: "setHash",
    value: function setHash(str) {
      _app.router.setHash(str);
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
    key: "setHashedActiveGenres",
    value: function setHashedActiveGenres() {
      var hash = _app.router.getHash().replace("_", "");
      var hashedGenres = hash.split("genres=");
      if (hashedGenres.length) {
        hashedGenres.forEach(function (hG) {
          _genreIcons.genreIcons.forEach(function (genre) {
            //if (hashedGenres.indexOf(genre.genre.name.toLowerCase()) > -1) {
            if (genre.genre.similarGenres.indexOf(decodeURIComponent(hG)) > -1) {
              debugger;
              genre.genre.checkedState = "checked";
              genre.genre.state = "on";
            }
          });
        });
      }
    }
  }, {
    key: "getActiveGenres",
    value: function getActiveGenres() {
      return _genreIcons.genreIcons.filter(function (icon) {
        return icon.genre.state === "on";
      });
    }
  }, {
    key: "createGenresDOM",
    value: function createGenresDOM() {
      var _this = this;

      this.setHashedActiveGenres();
      var genresDOM = (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: _genreIcons.genreIcons,
        tag: "li",
        txt: "\n            <div class=\"checkbox {{genre.state}}\" id=\"{{genre.genre}}\">\n              <input {{genre.checkedState}} type=\"checkbox\" class=\"check\" >\n                <label for=\"{{genre.genre.replace(' ', '_')}}\">\n                  <div class=\"{{genre.genre}}\"></div>\n                  <div class=\"genre_text\">{{genre.name}}</div>\n                </label>\n              </input>\n            </div>"
      }));
      (0, _createDom.createDOM)({ html: genresDOM, tag: "#genres", clear: true });

      _genreIcons.genreIcons.forEach(function (item) {
        (0, _action.action)({
          fn: _this.changeGenreState,
          tag: "#" + item.genre.genre,
          params: { item: item, activeGenres: _this.getActiveGenres() }
        });
      });
    }
  }, {
    key: "changeGenreState",
    value: function changeGenreState(options) {
      var checkbox = options.item;
      var icons = _genreIcons.genreIcons;

      var nodes = document.querySelectorAll(".checkbox");

      nodes.forEach(function (item, index) {
        if (checkbox.genre.genre === item.getAttribute("id")) {
          var classes = item.getAttribute("class");
          var classesArr = classes.split(" ") || [];

          var toggledClasses = [];
          var isOn = classes.indexOf("on") > -1;

          if (icons[index].genre.genre === checkbox.genre.genre) {
            var input = item.querySelector("input");
            if (isOn) {
              checkbox.genre.checkedState = "";
              checkbox.genre.state = "off";
              _app.router.setHash(removeFromHash(checkbox));
              toggledClasses = classesArr.filter(function (item) {
                return item.indexOf("on") === -1;
              });
              input.checked = false;
            } else {
              checkbox.genre.checkedState = "checked";
              checkbox.genre.state = "on";
              _app.router.setHash(addToHash(checkbox));
              classesArr.push(checkbox.genre.state);
              toggledClasses = classesArr.filter(function (item) {
                return item.indexOf("off") === -1;
              });
              input.checked = true;
            }

            classes = toggledClasses.join(" ");
            item.setAttribute("class", classes);
          }
        }
      });
    }
  }]);

  return Navigation;
}();

// Helper function to rebuild url after genre has been added


exports.default = Navigation;
function addToHash(checkbox) {
  var hash = _app.router.getHash();
  var similarGenresSplitter = checkbox.genre.similarGenres.split(",");
  var similarGenres = similarGenresSplitter.map(function (genre, index) {
    return similarGenresSplitter.length - 1 > index ? "genres=" + genre + "_" : "genres=" + genre;
  }).join("");
  var newHash = hash.indexOf("genres") > -1 ? hash + "_" + similarGenres : hash + similarGenres;
  return newHash;
}

// Helper function to rebuild url after a genre has been removed
function removeFromHash(checkbox) {
  var hash = _app.router.getHash();
  var hashSplitter = hash.split("genres=").map(function (item) {
    return item.replace("_", "");
  });
  var similarGenresSplitter = checkbox.genre.similarGenres.split(",");
  var currentGenres = hashSplitter.filter(function (genre) {
    // seems hacky to rely on hash here?
    return similarGenresSplitter.indexOf(decodeURIComponent(genre)) === -1;
  });
  var newHash = hashSplitter[0] + currentGenres.map(function (item, index) {
    if (index > 0) {
      return currentGenres.length - 1 > index ? "genres=" + item + "_" : "genres=" + item;
    }
  }).join("");
  return newHash;
}