"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createDom = require("../helpers/create-dom");

var _favoriteButton = require("./favorite-button");

var _favoriteButton2 = _interopRequireDefault(_favoriteButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var favoriteButton = new _favoriteButton2.default();
// creates a Modal Container that can be added to any route
//TODO: add css to make this fade in to the dom

var PlaylistCard = function () {
  function PlaylistCard() {
    _classCallCheck(this, PlaylistCard);
  }

  _createClass(PlaylistCard, [{
    key: "createCard",
    value: function createCard(card) {
      var baseSpotifyUrl = "https://open.spotify.com";
      var cardDOM = "\n            <div class=\"info\">\n            <a href=\"" + baseSpotifyUrl + "/track/" + card.id + "\" \n              target=\"_blank\">\n              " + card.name + "\n            </a>\n          </div>\n          <div class=\"info\">By\n            <a href=\"#/artist/" + card.artists[0].name + "\">\n              " + card.artists[0].name + "\n            </a>\n          </div>\n          <a href=\"" + baseSpotifyUrl + "/track/" + card.id + "\" \n            target=\"_blank\">\n            <div class=\"spot_link_spot\" style=\"margin-left:5px;font-size:27px;\" aria-hidden=\"true\" data-icon=\"c\"></div>\n          </a>";
      var cardNode = (0, _createDom.createHTMLNode)({
        tag: "li",
        html: cardDOM,
        attrs: [{ class: "gray card" }, { id: "card" + card.id }]
      });
      (0, _createDom.appendNode)({ selector: ".cards", node: cardNode });
      favoriteButton.createFavoriteButton(card);
      // createDOM({
      //   html: cardDOM,
      //   tag: ".cards",
      //   clear: false
      // });
      // adds click event to close button;
      //console.log(document.querySelector(".favorite"));
      // document.querySelectorAll(".favorite").forEach((item, index) => {
      //   const idx = index;
      //   item.addEventListener("click", () => {
      //     //addToStorage("hash", `/artist/${arguments[0].title}`);
      //     // window.location.hash = sessionStorage.hash; // should be added to router
      //     // clearDOM(".artist-modal");
      //     favoriteButton.toggleFavorite(item, card);
      //   });
      // });
    }
  }]);

  return PlaylistCard;
}();

exports.default = PlaylistCard;