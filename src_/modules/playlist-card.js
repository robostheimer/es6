"use strict";

import { createDOM, escapeTemplate, clearDOM } from "../helpers/create-dom";
import { iff } from "../helpers/if-template";
import FavoriteButton from "./favorite-button";

const favoriteButton = new FavoriteButton();

// creates a Modal Container that can be added to any route
//TODO: add css to make this fade in to the dom
export default class PlaylistCard {
  createCard(card) {
    const baseSpotifyUrl = "https://open.spotify.com";
    const cardDOM = `
      <li class="gray card">
            <div class="info">
            <a href="${baseSpotifyUrl}/track/${card.id}" 
              target="_blank">
              ${card.name}
            </a>
          </div>
          <div class="info">By
            <a href="#/artist/${card.artists[0].name}">
              ${card.artists[0].name}
            </a>
          </div>
          <a href="${baseSpotifyUrl}/track/${card.id}" 
            target="_blank">
            <div class="spot_link_spot" style="margin-left:5px;font-size:27px;" aria-hidden="true" data-icon="c"></div>
          </a>
          ${favoriteButton.createFavoriteButton(card.isFavorited)}
        </li>`;

    createDOM({
      html: cardDOM,
      tag: ".cards",
      clear: false
    });

    // adds click event to close button;
    console.log(document.querySelector(".favorite"));
    document.querySelectorAll(".favorite").forEach((item, index) => {
      const ind = index;
      item.addEventListener("click", () => {
        //addToStorage("hash", `/artist/${arguments[0].title}`);
        // window.location.hash = sessionStorage.hash; // should be added to router
        // clearDOM(".artist-modal");
        console.log("test" + ind);
      });
    });
  }
}
