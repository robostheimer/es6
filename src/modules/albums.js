'use strict'

import { createDOM, addAjaxAction, escapeTemplate } from '../helpers/create-dom';
import { createArrayFromFusionData, each } from '../helpers/each-template';
import { memoizeJSON, memoized, normalizeFusionResponse } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';
import  CreatePlaylist from './create-playlist';
import { buildFusionUrl } from '../helpers/urls';


const SCOPE = 'playlist-modify-private playlist-modify-public';
const CLIENT_ID = '6e385b2a58fa42f6832a3a0bc3152c23';
const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
});
const createPlaylist = new CreatePlaylist();

//TODO: Some problems with memoization -- NEED TO FIX
export default class Album {
  hasBackup() {
    return true;
  }

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
          addToStorage('hash', `/album_${id}_${name}`);
      } else {
        window.location.hash = `#/${sessionStorage.hash}`; // TODO: funnel this through the Router
      }
      return data;
    }
  }

  fetchAllAlbums(artist_id, name) {
    const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
    const selectedCols = '*';
    const matchType = 'CONTAINS IGNORING CASE';
    const sortBy = '';
    const fusionId = '1rKOhgBT3w70yHl2eR4hc66Zxxyw06CK3ZlPolNie'//e;
    const key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
    const where = 'Sid';
    const whereQuery = artist_id;
    const options = {
      baseUrl,
      fusionId,
      selectedCols,
      key,
      matchType,
      sortBy,
      where,
      whereQuery,
    };

    const url = buildFusionUrl(options)
    if (artist_id) {
      var data = memoizeJSON({
        key: `albums_${artist_id}`,
        fn() {
          return fetch(url);
        }
      });
      addToStorage('hash', `/albums/${artist_id}/${name}`);
      return data;
    }
  }

  fetchAllAlbumsSpotify(artist_id, name) {
    const url = `https://api.spotify.com/v1/artists/${artist_id}/albums`;
    if (artist_id) {
      var data = memoizeJSON({
        key: `albums_${artist_id}`,
        fn() {
          return fetch(url, {
            headers: auth_header
          });
        }
      });
      addToStorage('hash', `/albums/${artist_id}/${name}`);
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

  createAlbumsDOM(data, name) {
    let resolvedData;
    if (data.data) {
      //fusion table data
      resolvedData = createArrayFromFusionData(data.data, 'albums', 30);
    } else {
      //spotify data
      resolvedData = data.spotify;
    }
  
    const dom = escapeTemplate`
    <h2>Albums by: ${name}</h2>
      <ul id="top-tracks" class="cards">
        ${each({
          data: resolvedData,
          tag: 'li',
          txt: `<div>
                  <strong><a href="#/album/{{albumsId}}/{{albumsName}}">{{albumsName}}</a></strong>
                </div>
                `,
          attrs: {
            class:'artist',
            title: null,
            id: null,
            style: 'background-image:url({{albumsImagesUrl}})',
          }
        })}
      </ul>
      `;

    createDOM({ html: dom, tag: 'container', clear: true });
  }
}
