'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import { createDOM } from '../helpers/create-dom';

export default class RelatedArtist {
  //TODO: memoize this method
  fetchRelatedArtists(id) {
    return $.getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  }

  createRelatedArtistsDom(data, id) {
    //TODO:create a each/loop helper and import
    const dom = `
      <ul id="related-artists">
        ${data.map(artist => `
          <li class="related-artist" id=related-${artist.id}">
            ${artist.name}
          </li>
          `).join('')}
      </ul>
    `;
    createDOM({ html: dom, tag: id, clearElement: true });

  }
}
