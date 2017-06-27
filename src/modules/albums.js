'use strict'

import { createDOM, addAjaxAction, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';
import  CreatePlaylist from './create-playlist';


const SCOPE = 'playlist-modify-private playlist-modify-public';
const CLIENT_ID = '6e385b2a58fa42f6832a3a0bc3152c23';
const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
});
const createPlaylist = new CreatePlaylist();

//TODO: Some problems with memoization -- NEED TO FIX
export default class Album {
  fetchAlbum(id, name) {
    const url = `https://api.spotify.com/v1/albums/${id}/tracks`;
    if(id) {
      var data =  memoizeJSON({key: `album_${id}`,
        fn() {
          return fetch(url, {
            headers: auth_header
          });
        }
      });
      if(name) {
          addToStorage('hash', `album_${id}_${name}`);
      } else {
        window.location.hash = `#${sessionStorage.hash}`; // TODO: funnel this through the Router
      }
      return data;
    }
  }

  fetchAllAlbums(artist_id) {
    const url = `https://api.spotify.com/v1/artists/${artist_id}/albums`;
    if(artist_id) {
      var data =  memoizeJSON({key: `albums_${artist_id}`,
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
      <h2>Tracklist for ${data.name} by ${data.data.items[0].artists[0].name}</h2>
      <ul id="top-tracks">
        ${each({
          data: data.data.items,
          tag: 'li',
          txt: `<div>
                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
                </div>
                `,
          attrs: {
            class:'track',
            title: null,
            id: null,
          }
        })}
      </ul>
      `;
    createPlaylist.createSaveButtonDOM(data.data.items, 'songsFromAlbum', data.name);
    createDOM({ html: dom, tag: 'container', clear: true });
  }

  createAlbumsDOM(data) {
    const dom = escapeTemplate`
    <h2>Albums by: ${data.items[0].artists[0].name}</h2>
      <ul id="top-tracks" class="cards">
        ${each({
          data: data.items,
          tag: 'li',
          txt: `<div>
                  <strong><a href="#album_{{id}}_{{name}}">{{name}}</a></strong>
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

    createDOM({ html: dom, tag: 'container', clear: true });
  }
}
