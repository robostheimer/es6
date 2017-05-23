'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import { createDOM, escapeTemplate, addAjaxAction } from '../helpers/create-dom';
import Artist from './artist';

const artist = new Artist();

export default class ArtistForm {
  createArtistFormDom(action) {
    const formDom = escapeTemplate`
      <form id="search">
        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>
      </form>
    `;

    createDOM({ html: formDom, tag: 'body'});

    const linkDom = escapeTemplate`
      <button>
        Seach
      </button>
    `;

    createDOM({ html: linkDom, tag: 'search'});

    if(action) {
      addAjaxAction({
        action: action,
        id: 'search',
        type: artist,
        methods: [
          {
            method: 'fetchArtists'
          },
          {
            method: 'createArtistDom',
          }
        ],
        addDom: true // whether there will be dom added based on this action
      });
    }
  }
}
