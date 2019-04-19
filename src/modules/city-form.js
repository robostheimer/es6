"use strict";
import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { addToStorage } from "../helpers/add-to-storage";
import Router from "../router";
import Genres from "./genres";
const router = new Router();
const genre = new Genres();
export default class ArtistForm {
    createCityFormDom() {
        const formDom = escapeTemplate `
      <form id="search">
        <input type="text" id="find-artist" placeholder="Add a city.  Find music!"/>
      </form>
      <div id="spotify-player"></div>
    `;
        createDOM({ html: formDom, tag: "body" });
        const buttonDOM = escapeTemplate `
      <button id="search_artists">
        Search
      </button>
    `;
        createDOM({ html: buttonDOM, tag: "#search" });
        const containerDOM = escapeTemplate `
      <section id="container"></section>
    `;
        createDOM({ html: containerDOM, tag: "body" });
        //adds click event to button;
        document
            .getElementById("search_artists")
            .addEventListener("click", event => {
            if (event.preventDefault) {
                event.preventDefault();
            }
            this._getParamsFromHash();
        });
        //adds onEnter to the input
        document
            .getElementById("find-artist")
            .addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                this._getParamsFromHash();
            }
        });
    }
    _getParamsFromHash() {
        // @ts-ignore
        const val = document.getElementById("find-artist").value;
        // clear any genres
        genre.clearGenres();
        router.setHash(`/city/${val}/`);
        router.getParamsFromHash(router.getHash());
        addToStorage("hash", `/artist/${val}/`);
    }
}
