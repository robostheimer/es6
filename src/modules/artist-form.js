'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import { createDOM, escapeTemplate, addAjaxAction } from '../helpers/create-dom';
import Artist from './artist';

const artist = new Artist();

export default class ArtistForm {
  createArtistFormDom(action) {
    const dom = escapeTemplate`
      <form>
        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>
      </form>
      <button id="search">Search</button
    `;

    createDOM({ html: dom, tag: 'body'});
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
            params: {
              action: 'click'
            }
          }
        ],
        addDom: true // whether there will be dom added based on this action
      });
    }
  }
}
