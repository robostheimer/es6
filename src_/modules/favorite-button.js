"use strict";

import { createDOM, escapeTemplate, clearDOM } from "../helpers/create-dom";

// creates a Modal Container that can be added to any route
//TODO: add css to make this fade in to the dom
export default class FavoriteButton {
  createFavoriteButton(isFavorited) {
    const dom = isFavorited
      ? `<button class="icon iconfavorite spot_link favorite favorite_on"></button>`
      : `<button class="icon iconfavorite2 spot_link favorite"></button>`;

    // createDOM({
    //   html: dom,
    //   tag,
    //   clear: false
    // });
    return dom;
  }
}
