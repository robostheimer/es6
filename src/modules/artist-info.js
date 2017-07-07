'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { iff } from '../helpers/if-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';


const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
})

export default class ArtistInfo {
  //TODO: memoize this method; see javascript ninja book
  fetchArtistInfo(...args) {
    debugger;
    const artistname = args[1];
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistname}&api_key=1f91c93293d618de5c30f8cfe2e9f5e9&format=json`;
    const data = memoizeJSON({key: `${artistname}_info`,
      fn() {
        return fetch(url, {
          headers: auth_header
        });
      }
    });
    addToStorage('hash', `artist/info/${artistname}`);

    return data;
  }

  createInfoDOM(data) {
    console.log(data.data.artist.name);
    const dom = iff(data.data.artist,
    escapeTemplate`
      <h4>Info about ${data.data.artist.name}</h4>

      `,
      `<p><strong>There are no artists related</strong</p>`);
    createDOM({ html: dom, tag: 'container' });
  }
}
