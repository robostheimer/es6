'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import relatedArtists from './related-artists';
import { createDOM, addAjaxAction, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';

const related = new relatedArtists();

export default class Artist {
  //TODO: memoize this method javascript ninja book
  fetchArtists() {
    const name = $('#find-artist').val();
    if(name) {
      return $.getJSON(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
    }
  }

  //TODO: Try to think about how to abstract this to use for all situations of creating dom
  //perhaps a recursive function of
  createArtistDom(data, params) {
    const action = params.action
    //TODO:create a each/loop helper and import
    const dom = escapeTemplate`
      <ul id="artists">
        ${each({
          data: data,
          tag: 'li',
          txt: 'Is <b>{{name}}</b> the artist you were looking for',
          attrs: {
            class:'artist'
          }
        })}
      </ul>
    `;
    console.log(data)
    createDOM({ html: dom, tag: 'body' });
    if(action) {
      addAjaxAction({
        action: action,
        id: 'artists',
        type: related,
        methods: [
          {
            method: 'fetchRelatedArtists'
          },
          {
            method: 'createRelatedArtistsDom',
            params: {
              action: 'click',
              artists: data
            }
          }
        ],
        addDom: true // whether there will be dom added based on this action
      });
    }

  }
}
