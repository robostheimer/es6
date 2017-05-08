'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import relatedArtists from './related-artists';
import { createDOM, addAjaxAction } from '../helpers/create-dom';

const related = new relatedArtists();

export default class Artist {
  //TODO: memoize this method javascript ninja book
  fetchArtists() {
    return $.getJSON('https://api.spotify.com/v1/artists?ids=7jy3rLJdDQY21OgRLCZ9sD,5xUf6j4upBrXZPg6AI4MRK')
  }

  //TODO: Try to think about how to abstract this to use for all situations of creating dom
  //perhaps a recursive function of
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
    `;

    createDOM({ html: dom, tag: 'body' });

    addAjaxAction({
      action: action,
      id: 'artists',
      type: related,
      methods: ['fetchRelatedArtists', 'createRelatedArtistsDom'],
      addDom: true // whether there will be dom added based on this action
    });
  }
}
