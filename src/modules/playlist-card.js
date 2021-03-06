"use strict";
import { createHTMLNode, appendNode } from "../helpers/create-dom";
import FavoriteButton from "./favorite-button";
const favoriteButton = new FavoriteButton();
// creates a Modal Container that can be added to any route
//TODO: add css to make this fade in to the dom
export default class PlaylistCard {
    createCard(card) {
        const baseSpotifyUrl = "https://open.spotify.com";
        const cardDOM = `
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
          </a>`;
        const cardNode = createHTMLNode({
            tag: "li",
            html: cardDOM,
            attrs: [{ class: "gray card" }, { id: `card${card.id}` }]
        });
        appendNode({ selector: ".cards", node: cardNode });
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
}
