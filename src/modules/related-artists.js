'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';

export default class RelatedArtist {
  //TODO: memoize this method
  fetchRelatedArtists(id) {
    return $.getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  }

  createRelatedArtists(data) {
    console.log(data)
    //TODO:create a each/loop helper and import
    const dom = `
      <ul id="artists">
        ${data.map(artist => `
          <li class="artist" id="${artist.id}">
            ${artist.name}
          </li>
          `).join('')}
      </ul>
    `;
    return dom;
  }
}
