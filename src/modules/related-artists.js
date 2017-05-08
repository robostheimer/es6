'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import { createDOM, escapeTemplate } from '../helpers/create-dom';

export default class RelatedArtist {
  //TODO: memoize this method; see javascript ninja book
  fetchRelatedArtists(id) {
    return $.getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  }

  createRelatedArtistsDom(data, params) {
    const dom = escapeTemplate`
      <ul id="related-artists">
        ${data.map(artist => `
          <li class="related-artist" id=${artist.id}>
            ${artist.name}
          </li>
          `).join('')}
      </ul>
    `;
    createDOM({ html: dom, tag: params.id });

  }
}
