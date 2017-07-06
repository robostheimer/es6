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
    console.log(data.data.artist);
    // const dom = iff(data.artists.length > 0,
    // escapeTemplate`
    //   <h4>Related Musicians</h4>
    //   <ul id="related-artists" class="cards">
    //     ${each({
    //       data: data.artists,
    //       tag: 'li',
    //       txt: '<a href="#/artist/{{name}}">{{name}}</a>',
    //       attrs: {
    //         class: 'related-artist',
    //         id: null,
    //         style: 'background-image:url({{images[0].url}})'
    //       }
    //     })}
    //   </ul>
    //   `,
    //   `<p><strong>There are no artists related</strong</p>`);
    // createDOM({ html: dom, tag: 'container' });
  }
}
