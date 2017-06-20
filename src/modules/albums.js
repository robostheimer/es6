'use strict'

import { createDOM, addAjaxAction, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';


const SCOPE = 'playlist-modify-private playlist-modify-public';
const CLIENT_ID = '6e385b2a58fa42f6832a3a0bc3152c23';
const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
})

//TODO: Some problems with memoization -- NEED TO FIX
export default class Artist {
  fetchAlbum(id) {
    debugger;
    const url = `https://api.spotify.com/v1/albums/${id}/tracks`;
    if(id) {
      var data =  memoizeJSON({key: name,
        fn() {
          return fetch(url, {
            headers: auth_header
          });
        }
      });
      addToStorage('hash', `album_${id}`);
      return data;
    }
  }

  fetchAllAlbums(artist_id) {
    const url = `https://api.spotify.com/v1/artists/${artist_id}/albums`;
    if(artist_id) {
      var data =  memoizeJSON({key: name,
        fn() {
          return fetch(url, {
            headers: auth_header
          });
        }
      });
      addToStorage('hash', `albums_${artist_id}`);
      return data;
    }
  }

  createAlbumDOM(data) {
    const dom = escapeTemplate`
      <h2>Tracklist for ${data.items[0].name.split('-')[1]}</h2>
      <ul id="top-tracks" class="cards">
        ${each({
          data: data.items,
          tag: 'li',
          txt: `<div>
                  <strong>{{name}}</a></strong>
                </div>
                `,
          attrs: {
            class:'artist',
            title: null,
            id: null,
          }
        })}
      </ul>
      `;

    createDOM({ html: dom, tag: 'container' });
  }

  createAlbumsDOM(data) {
    const dom = escapeTemplate`
    <h2>Albums by: ${data.items[0].artists[0].name}</h2>
      <ul id="top-tracks" class="cards">
        ${each({
          data: data.items,
          tag: 'li',
          txt: `<div>
                  <strong><a href="#album_{{id}}">{{name}}</a></strong>
                </div>
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

    createDOM({ html: dom, tag: 'container' });
  }
}
