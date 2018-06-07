'use strict'

import relatedArtists from './related-artists';
import  CreatePlaylist from './create-playlist';
import { clearDOM, createDOM, addAjaxAction, escapeTemplate } from '../helpers/create-dom';
import { createArrayFromFusionData, each } from '../helpers/each-template';
import { memoizeJSON, memoized, normalizeFusionResponse } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';
import { buildFusionUrl } from '../helpers/urls';

const related = new relatedArtists();
const createPlaylist = new CreatePlaylist();
const auth_header = new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
});


export default class Artist {
  hasBackup() {
    return true;
  }

  fetchArtists(name) {
    const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
    const selectedCols = '*'
    const matchType = 'CONTAINS IGNORING CASE';
    const sortBy = 'ORDER%20BY+spotifyPopularity+DESC';
    const fusionId = '1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv';
    const key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
    const  where = 'Name';
    const whereQuery = name;

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
    console.log(url)
    if(name) {
      const data =  memoizeJSON({key: name,
        fn() {
          return fetch(url);
        }
      });
      addToStorage('hash', `/artist/${name}`);
      return data;
    }
  }

  fetchArtistsSpotify(name) {
    const url = `https://api.spotify.com/v1/search?q=${name}&type=artist`;
    if (name) {
      const data = memoizeJSON({
        key: name,
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
    const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
    const selectedCols = '*';
    const matchType = 'CONTAINS IGNORING CASE';
    const sortBy = '';
    const fusionId = '1kd1mthytuNgg6v1uzMRRfEfBkX8qzZ2loRgAfePE';
    const key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
    const where = 'Sid';
    const whereQuery = id;

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

    if(id) {
      var data =  memoizeJSON({key: `top_${id}`,
        fn() {
          return fetch(url);
        }
      });
      addToStorage('hash', `/top/${id}/${name}`);
      return data;
    }
  }

  fetchTopTracksSpotify(id) {
    const request = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`

    if (id) {
      var data = memoizeJSON({
        key: `top_${id}`,
        fn() {
          return fetch(request, {
            headers: auth_header
          });
        }
      });
      addToStorage('hash', `/top/${id}/${name}`);
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
    clearDOM('.artist-modal');
    let resolvedData;

    if(data.data) {
      //fusion table data
      resolvedData = data.data;
    } else {
      //spotify data
      resolvedData = data.spotify;
    }

    //$('#artists').remove();
    //const action = params.action;
    const dom = escapeTemplate`
      <ul id="artists" class="cards">
        ${each({
          data: resolvedData,
          tag: 'li',
          txt: `<div>
                  <h4><a href="#/artist/info/{{Name}}">{{Name}}</a></h4>
                </div>
                <ul class="options">
                  <li>
                    <a href="#/related/{{Sid}}/{{Name}}">
                      Related Musicians
                    </a>
                  </li>
                  <li>
                    <a href="#/top/{{Sid}}/{{Name}}">
                      Top Tracks
                    </a>
                  </li>
                  <li>
                    <a href="#/albums/{{Sid}}/{{Name}}">
                      Albums
                    </a>
                  </li>
                  <li>
                    <a href="#/recommendations/{{Sid}}">
                      Create Radio Station
                    </a>
                  <li>
                  <li>
                    <a href="#/location/{{Lat}},{{Lng}}/artists">
                      Other musicians from {{City}}
                    </a>
                  </li>
                  <li>
                    <a href="#/location/{{Lat}},{{Lng}}/tracks">
                      Hottest Tracks from {{City}}
                    </a>
                  </li>
                </ul>
                `,
          attrs: {
            class:'artist',
            title: null,
            id: null,
            style: 'background-image:url({{spotifyImageUrl}})',
          }
        })}
      </ul>
    `;

    createDOM({ html: dom, tag: 'container', clear: true });
  }


  createTopTracksDOM(data, name) {
    let resolvedData;

    if (data.data) {
      //fusion table data
      resolvedData = createArrayFromFusionData(data.data, 'related', 20); 
    } else {
      //spotify data
      resolvedData = data.spotify;
    }

    const dom = escapeTemplate`
      <h2>Top Tracks for ${name}</h2>
      <ul id="top-tracks" class="cards">
        ${each({
          data: resolvedData,
          tag: 'li',
          txt: `<div>
                  <strong><a href="{{topTracksId}}" target="_blank">{{topTracksName}}</a></strong>
                </div>
                <p>
                  from: <a href="#/album/{{topTracksAlbumId}}/{{topTracksAlbumName}}">{{topTracksAlbumName}}</a>
                </p>
                `,
          attrs: {
            class:'artist card',
            title: null,
            id: null,
            style: 'background-image:url({{topTracksAlbumImagesUrl}})',
          }
        })}
      </ul>
      `;
    // Need to update create playlist functionality to play nice with new data structure  
    //createPlaylist.createSaveButtonDOM(normalizedData, 'topSongs');
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
