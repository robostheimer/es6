"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arrays = require("../helpers/arrays");

var _createDom = require("../helpers/create-dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

isFavorited: Boolean;

var FavoriteButton = function () {
    function FavoriteButton() {
        _classCallCheck(this, FavoriteButton);
    }

    _createClass(FavoriteButton, [{
        key: "createFavoriteButton",
        value: function createFavoriteButton(item) {
            var isFavorited = this.isFavorited(item);
            var cl = isFavorited ? "icon iconfavorite spot_link favorite favorite_on" : "icon iconfavorite2 spot_link favorite";
            var favoriteButton = (0, _createDom.createHTMLNode)({
                tag: "button",
                html: "",
                attrs: [{ class: cl }]
            });
            (0, _createDom.action)({
                node: favoriteButton,
                type: "click",
                fn: this.toggleFavorite,
                params: { dom: favoriteButton, item: item }
            });
            (0, _createDom.appendNode)({ selector: "#card" + item.id, node: favoriteButton });
        }
    }, {
        key: "isFavorited",
        value: function isFavorited(item) {
            var favorites = this.getFavoritesArray();
            return (0, _arrays.itemIsInArray)(item, favorites, "id");
        }
    }, {
        key: "toggleFavorite",
        value: function toggleFavorite(options) {
            var dom = options.dom;
            var item = options.item;
            var favorites = void 0;
            if (localStorage.getItem("FavoriteArr") != null && localStorage.getItem("FavoriteArr") != "") {
                favorites = JSON.parse(localStorage.getItem("FavoriteArr"));
            } else {
                favorites = [];
            }
            var isFavorited = dom.getAttribute("class").indexOf("iconfavorite2") === -1;
            if (isFavorited) {
                dom.classList.add("iconfavorite2");
                dom.classList.remove("iconfavorite");
                localStorage.setItem("FavoriteArr", JSON.stringify((0, _arrays.removeItem)(favorites, item, "id")));
            } else {
                dom.classList.add("iconfavorite");
                dom.classList.remove("iconfavorite2");
                favorites.push(item);
                localStorage.setItem("FavoriteArr", JSON.stringify(favorites));
            }
        }
    }, {
        key: "getFavoritesArray",
        value: function getFavoritesArray() {
            if (localStorage.getItem("FavoriteArr") != null && localStorage.getItem("FavoriteArr") != "") {
                var favorites = JSON.parse(localStorage.getItem("FavoriteArr"));
            } else {
                favorites = [];
            }
            return favorites;
        }
    }]);

    return FavoriteButton;
}();

exports.default = FavoriteButton;