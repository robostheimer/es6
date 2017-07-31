'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { iff } from '../helpers/if-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';
import Artist from './artist';
import Modal from './modal-create';


const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
});

const artist = new Artist();
const modal = new Modal();

export default class ArtistInfo {
  //TODO: memoize this method; see javascript ninja book
  fetchArtistInfo(...args) {
    const artistname = args[1];
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistname}&api_key=1f91c93293d618de5c30f8cfe2e9f5e9&format=json`;
    const data = memoizeJSON({key: `${artistname}_info`,
      fn() {
        return fetch(url, {
          headers: auth_header
        });
      }
    });

    return data;
  }

  createInfoDOM(data) {
    modal.createModal({ title: data.data.artist.name });

    const infoDom = iff(data.data.artist.bio.summary ,
    escapeTemplate`
      <div>
        <img src="${data.data.artist.image[2]['#text']}" alt="${data.data.artist.name}"/>
      </div>
      <div>
        <p>${data.data.artist.bio.summary}</p>
      </div>

      `,
      `<p><strong>There are no artists related</strong</p>`);

    // createDOM({ html: modalDom, tag: 'container' });
    createDOM({ html: infoDom, tag: 'modal-container', clear: true });
  }
}
