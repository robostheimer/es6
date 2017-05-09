'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import { createDOM, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';

export default class RelatedArtist {
  //TODO: memoize this method; see javascript ninja book
  fetchRelatedArtists(id) {
    return $.getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  }

  createRelatedArtistsDom(data, params) {
    const dom = escapeTemplate`
      <ul id="related-artists">
        <h4>Related Musicians</h4>
        ${each({
          data: data,
          tag: 'li',
          txt: '{{name}}',
          attrs: {
            class: 'related-artist'
          }
        })}
      </ul>
    `
    createDOM({ html: dom, tag: params.id });

  }
}
