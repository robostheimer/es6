'use strict'

import relatedArtists from './related-artists';
import  CreatePlaylist from './create-playlist';
import { createDOM, addAjaxAction, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';

const related = new relatedArtists();
const createPlaylist = new CreatePlaylist();
const SCOPE = 'playlist-modify-private playlist-modify-public';
const CLIENT_ID = '6e385b2a58fa42f6832a3a0bc3152c23';
const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
})

//TODO: Need to add album and track class/components to support linking.
export default class Artist {
  fetchArtists(name) {
    const url = `https://api.spotify.com/v1/search?q=${name}&type=artist`;
    if(name) {
      const data =  memoizeJSON({key: name,
        fn() {
          return fetch(url, {
            headers: auth_header
          });
        }
      });
      addToStorage('hash', `/artist/${name}`);
      return data;
    }
  }

  fetchTopTracks(id) {
    const request = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`

    if(id) {
      var data =  memoizeJSON({key: `top_${id}`,
        fn() {
          return fetch(request, {
            headers: auth_header
          });
        }
      });
      addToStorage('hash', `/top/${id}`);
      return data;
    }
  }

  fetchAlbums(id) {
    const request = `https://api.spotify.com/v1/artists/${id}/albums`;

    if(id) {
      var data =  memoizeJSON({key: `albums_${id}`,
        fn() {
          return fetch(request, {
            headers: auth_header
          });
        }
      });
      addToStorage('hash', `/albums/${id}`);
      return data;
    }
  }

  fetchRecommendations(id) {
    const request = `https://api.spotify.com/v1/recommendations?seed_artists=${id}&limit=50`;

    if(id) {
      var data =  memoizeJSON({key: `recs_${id}`,
        fn() {
          return fetch(request, {
            headers: auth_header
          });
        }
      });
      addToStorage('hash', `/recommendations/${id}`);
      return data;
    }
  }

  //TODO: Try to think about how to abstract this to use for all situations of creating dom
  //perhaps a recursive function of
  createArtistDom(data) {//, params) {
    $('#artists').remove();
    //const action = params.action;
    const dom = escapeTemplate`
      <ul id="artists" class="cards">
        ${each({
          data: data.artists.items,
          tag: 'li',
          txt: `<div>
                  <h4><a href="#/artist/info/{{name}}">{{name}}</a></h4>
                </div>
                <ul class="options">
                  <li>
                    <a href="#/related/{{id}}">
                      Related Musicians
                    </a>
                  </li>
                  <li>
                    <a href="#/top/{{id}}">
                      Top Tracks
                    </a>
                  </li>
                  <li>
                    <a href="#/albums/{{id}}">
                      Albums
                    </a>
                  </li>
                  <li>
                    <a href="#/recommendations/{{id}}">
                      Create Radio Station
                    </a>
                  <li>
                  <li>
                    <a>
                      Other musicians from {{location}}
                    </a>
                  </li>
                </ul>
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


  createTopTracksDOM(data) {
    const dom = escapeTemplate`
      <h2>Top Tracks for ${data.tracks[0].artists[0].name}</h2>
      <ul id="top-tracks" class="cards">
        ${each({
          data: data.tracks,
          tag: 'li',
          txt: `<div>
                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
                </div>
                <p>
                  from: <a href="#/album/{{album.id}}/{{album.name}}">{{album.name}}</a>
                </p>
                `,
          attrs: {
            class:'artist card',
            title: null,
            id: null,
            style: 'background-image:url({{album.images[0].url}})',
          }
        })}
      </ul>
      `;
    createPlaylist.createSaveButtonDOM(data.tracks, 'topSongs');
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
                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
                </div>
                `,
          attrs: {
            class:'album card',
            title: null,
            id: null,
            style: 'background-image:url({{images[0].url}})',
          }
        })}
      </ul>
      `;

    createDOM({ html: dom, tag: 'container', clear: true });
  }

  createRecsDOM(data) {
    const dom = escapeTemplate`
    <h2>Playlist Inspired by: ${data.tracks[0].artists[0].name}</h2>
      <ul id="radio" class="cards">
        ${each({
          data: data.tracks,
          tag: 'li',
          txt: `<div>
                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
                </div>
                <p>
                  Album: <a href="#/album/{{album.id}}/{{album.name}}">{{album.name}}</a>
                </p>
                <p>By: <a href="#/artist/{{artists[0].name}}">{{artists[0].name}}</a>
                `,
          attrs: {
            class:'playlist card',
            title: null,
            id: null,
            style: 'background-image:url({{album.images[0].url}})',
          }
        })}
      </ul>
      `;
      createPlaylist.createSaveButtonDOM(data.tracks, 'radio');
      createDOM({ html: dom, tag: 'container', clear: true });
  }
}
