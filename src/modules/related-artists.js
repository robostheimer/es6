'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
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
      <ul id="related-artists" class="cards related">
        <h4>Related Musicians</h4>
        ${each({
          data: data.artists,
          tag: 'a',
          txt: '<li>{{name}}</li>',
          attrs: {
            class: 'related-artist',
            id: null,
            href: '#artist_{{id}}'
          }
        })}
      </ul>
      `,
      `<p><strong>There are no artists related</strong</p>`);
    createDOM({ html: dom, tag: 'body' });
  }
}
