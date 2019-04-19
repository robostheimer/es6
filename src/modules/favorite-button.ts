"use strict";

import { removeItem, itemIsInArray } from "../helpers/arrays";
import { createHTMLNode, appendNode, action } from "../helpers/create-dom";

isFavorited: Boolean;

export default class FavoriteButton {
  createFavoriteButton(item) {
    const isFavorited = this.isFavorited(item);
    const cl = isFavorited
      ? "icon iconfavorite spot_link favorite favorite_on"
      : "icon iconfavorite2 spot_link favorite";

    const favoriteButton = createHTMLNode({
      tag: "button",
      html: "",
      attrs: [{ class: cl }]
    });
    action({
      node: favoriteButton,
      type: "click",
      fn: this.toggleFavorite,
      params: { dom: favoriteButton, item: item }
    });
    appendNode({ selector: `#card${item.id}`, node: favoriteButton });
  }

  isFavorited(item) {
    const favorites = this.getFavoritesArray();
    return itemIsInArray(item, favorites, "id");
  }

  toggleFavorite(options) {
    const dom = options.dom;
    const item = options.item;
    let favorites;

    if (
      localStorage.getItem("FavoriteArr") != null &&
      localStorage.getItem("FavoriteArr") != ""
    ) {
      favorites = JSON.parse(localStorage.getItem("FavoriteArr"));
    } else {
      favorites = [];
    }
    const isFavorited =
      dom.getAttribute("class").indexOf("iconfavorite2") === -1;
    if (isFavorited) {
      dom.classList.add("iconfavorite2");
      dom.classList.remove("iconfavorite");
      localStorage.setItem(
        "FavoriteArr",
        JSON.stringify(removeItem(favorites, item, "id"))
      );
    } else {
      dom.classList.add("iconfavorite");
      dom.classList.remove("iconfavorite2");

      favorites.push(item);
      localStorage.setItem("FavoriteArr", JSON.stringify(favorites));
    }
  }

  getFavoritesArray() {
    if (
      localStorage.getItem("FavoriteArr") != null &&
      localStorage.getItem("FavoriteArr") != ""
    ) {
      var favorites = JSON.parse(localStorage.getItem("FavoriteArr"));
    } else {
      favorites = [];
    }

    return favorites;
  }
}
