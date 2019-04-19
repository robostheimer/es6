"use strict";

import { clearDOM, createDOM, escapeTemplate } from "../helpers/create-dom";
import { each } from "../helpers/each-template";
import { iff } from "../helpers/if-template";
import { memoizeJSON, memoized } from "../helpers/memoize";
import { addToStorage } from "../helpers/add-to-storage";
import Artist from "./artist";
import Modal from "./modal-create";

const artist = new Artist();
const modal = new Modal();

export default class ArtistInfo {
  fetchArtistInfo(...args) {
    const artistname = args[1];
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistname}&api_key=1f91c93293d618de5c30f8cfe2e9f5e9&format=json`;
    const data = memoizeJSON({
      key: `${artistname}_info`,
      fn() {
        return fetch(url);
      }
    });

    return data;
  }

  createInfoDOM(data) {
    clearDOM(".artist-modal");
    modal.createModal({ title: data.artist.name });

    const infoDom = iff(
      data.artist.bio.summary,
      escapeTemplate`
      <div>
        <img src="${data.artist.image[2]["#text"]}" alt="${data.artist.name}"/>
      </div>
      <div>
        <p>${data.artist.bio.summary}</p>
      </div>

      `,
      `<p><strong>There are no artists related</strong</p>`
    );

    // createDOM({ html: modalDom, tag: 'container' });
    addToStorage("hash", `/artist/info/${name}`);
    createDOM({ html: infoDom, tag: "#modal-container", clear: true });
  }
}
