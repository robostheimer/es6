'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import relatedArtists from './related-artists';
import { createDOM } from '../helpers/create-dom';

export default class Artist {
  //TODO: memoize this method javascript ninja book
  fetchArtists() {
    return $.getJSON('https://api.spotify.com/v1/artists?ids=7jy3rLJdDQY21OgRLCZ9sD,5xUf6j4upBrXZPg6AI4MRK');
  }

  createArtistDom(data, action) {
    //TODO:create a each/loop helper and import
    const dom = `
      <ul id="artists">
        ${data.map(artist => `
          <li class="artist" id="${artist.id}">
            ${artist.name}
          </li>
          `).join('')}
      </ul>
      <script>
        $('#artists').${action}(() =>{
          alert('clicked')
        })
      </script>
    `;

    return dom;
  }
}
