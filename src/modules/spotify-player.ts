"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
// import { each } from '../helpers/each-template';
// import { iff } from '../helpers/if-template';
// import { memoizeJSON, memoized } from '../helpers/memoize';
// import { addToStorage } from '../helpers/add-to-storage';

const auth_header = new Headers({
  Authorization: `Bearer ${sessionStorage.access_token}`
});

export default class SpotifyPlayer {
  // Creates spotify iframe player in app
  createSpotifyPlayerDOM(id, username) {
    const url = `https://open.spotify.com/embed?uri=spotify:user:${username}:playlist:${id}`;
    const playerDOM = escapeTemplate`
       <iframe src=${url} width="300" height="100" frameborder="0" allowtransparency="true"></iframe>
     `;
    createDOM({ html: playerDOM, tag: "#spotify-player", clear: true });
  }
}
