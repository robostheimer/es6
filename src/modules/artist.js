'use strict'

import relatedArtists from './related-artists';
import { createDOM, addAjaxAction, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { memoizeJSON, memoized } from '../helpers/memoize';

const related = new relatedArtists();

export default class Artist {
  //TODO: memoize this method javascript ninja book

  fetchArtists(name) {
    const url = `https://api.spotify.com/v1/search?q=${name}&type=artist`

    if(name) {
      var data =  memoizeJSON({key: name,
        fn() {
          return fetch(url);
        }
      });

      return data;
    }
  }

  //TODO: Try to think about how to abstract this to use for all situations of creating dom
  //perhaps a recursive function of
  createArtistDom(data){//, params) {
    $('#artists').remove();
    //const action = params.action;
    const dom = escapeTemplate`
      <ul id="artists" class="cards">
        ${each({
          data: data.artists.items,
          tag: 'li',
          txt: `<a href="#related_{{id}}">
                  <div>
                    <strong>{{name}}</strong>
                  </div>
                </a>
                `,
          attrs: {
            class:'artist',
            title: null,
            id: null,
            style: 'background-image:url({{images[0].url}})',
          }
        })}
      </ul>
    `;

    createDOM({ html: dom, tag: 'body' });
  }
}
