'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { iff } from '../helpers/if-template';
import { memoize } from '../helpers/memoize';
import { memoizeJSON, memoized } from '../helpers/memoize';

export default class RelatedArtists {
  //TODO: memoize this method; see javascript ninja book
  fetchRelatedArtists(id) {
    if(id && !memoized(id)) {

      const url = `https://api.spotify.com/v1/artists/${id}/related-artists`;

      var data = memoizeJSON({key: id,
        fn() {
          return fetch(url)
        }
      });
      return data;
    }
  }

  createRelatedArtistsDom(data, params) {
    const dom = iff(data.artists.length > 0,
    escapeTemplate`
      <h4>Related Musicians</h4>
      <ul id="related-artists" class="cards">
        ${each({
          data: data.artists,
          tag: 'li',
          txt: '<a href="#artist_{{name}}">{{name}}</a>',
          attrs: {
            class: 'related-artist',
            id: null
          }
        })}
      </ul>
      `,
      `<p><strong>There are no artists related</strong</p>`);
    createDOM({ html: dom, tag: 'body' });
  }
}
