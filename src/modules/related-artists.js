'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { iff } from '../helpers/if-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';


const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
})

export default class RelatedArtists {
  //TODO: memoize this method; see javascript ninja book
  fetchRelatedArtists(id) {
    const url = `https://api.spotify.com/v1/artists/${id}/related-artists`;

    const data = memoizeJSON({key: id,
      fn() {
        return fetch(url, {
          headers: auth_header
        });
      }
    });
    addToStorage('hash', `/related/${id}`);
    return data;
  }

  createRelatedArtistsDom(data, params) {
    const dom = iff(data.artists.length > 0,
    escapeTemplate`
      <h4>Related Musicians</h4>
      <ul id="related-artists" class="cards">
        ${each({
          data: data.artists,
          tag: 'li',
          txt: '<a href="#/artist/{{name}}">{{name}}</a>',
          attrs: {
            class: 'related-artist',
            id: null,
            style: 'background-image:url({{images[0].url}})'
          }
        })}
      </ul>
      `,
      `<p><strong>There are no artists related</strong</p>`);
    createDOM({ html: dom, tag: 'container' });
  }
}
