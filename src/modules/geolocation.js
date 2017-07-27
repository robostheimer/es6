'use strict'

import { createDOM, addAjaxAction, escapeTemplate, clearDOM } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';
import Map from '../modules/map'
import Modal from './modal-create';

const map = new Map();
const modal = new Modal();

//TODO: Need to add album and track class/components to support linking.
export default class Geolocation {
  getGeolocation() {
    // Checks if Geolocation is available;
    // If it is is runs the handle_geolocation_query or the handle Gelocation.handle)errors function if access to the Geolocation API is denied by the user
    var geolocation = () => {
      const loaderDom = escapeTemplate `
        <div class="loader" id="loader">
        LOADING...
        </div>`//make this a dom component that can be added

      createDOM({ html: loaderDom, tag:'container', clear: false });
      return new Promise ((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords)
          resolve({ position: position.coords, location: 'test', tag: 'modal-container' });
        },
        (error) => {
          console.log(error);
        }
    );
    });
  }

    return geolocation();
  }

  _handleErrors(error) {
    alert(error)
  }

  buildMap(options) {
    clearDOM('loader');
    modal.createModal({ title: options.location })
    map.buildMap(options.position.latitude, options.position.longitude, options.location, options.tag);
    const ctaDom = escapeTemplate `
      <div>
        Would you like to learn about musicians from your current location?
      </div>`

    createDOM({ html: ctaDom, tag:'modal-footer', clear: false });

    modal.createButtons([
      {
        id: 'yes',
        value: 'Yes please',
        route: () => {}, //eventually will use router.getHash()
      }, {
        id: 'no',
        value: 'No thanks',
        route: () => {}, //eventually will use router.getHash()
      }
    ]);
      addToStorage('hash', 'geolocation');
  }


  _getArtistsFromLocation(lat, lng, ratio) {
    const request = `https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+CityName%2C+Region%2C+CountryID+FROM+1B8NpmfiAc414JhWeVZcSqiz4coLc_OeIh7umUDGs+WHERE+Lat+<="${(lat+ratio)}"+AND+Lat>=${(lat - ratio)}"+AND+Long<=${(lng+ratio)}+AND+Long>=${(lng -ratio)}&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0,`;
    var data =  memoizeJSON({key: `geolocation_${lat_lng}`,
      fn() {
        return fetch(request);
      }
    });

    return data;
  }

  // fetchTopTracks(id) {
  //   const request = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`
  //
  //   if(id) {
  //     var data =  memoizeJSON({key: `top_${id}`,
  //       fn() {
  //         return fetch(request, {
  //           headers: auth_header
  //         });
  //       }
  //     });
  //     addToStorage('hash', `top_${id}`);
  //     return data;
  //   }
  // }
  //
  // fetchAlbums(id) {
  //   const request = `https://api.spotify.com/v1/artists/${id}/albums`;
  //
  //   if(id) {
  //     var data =  memoizeJSON({key: `albums_${id}`,
  //       fn() {
  //         return fetch(request, {
  //           headers: auth_header
  //         });
  //       }
  //     });
  //     addToStorage('hash', `/albums_${id}`);
  //     return data;
  //   }
  // }
  //
  // fetchRecommendations(id) {
  //   const request = `https://api.spotify.com/v1/recommendations?seed_artists=${id}&limit=50`;
  //
  //   if(id) {
  //     var data =  memoizeJSON({key: `recs_${id}`,
  //       fn() {
  //         return fetch(request, {
  //           headers: auth_header
  //         });
  //       }
  //     });
  //     addToStorage('hash', `recommendations_${id}`);
  //     return data;
  //   }
  // }
  //
  // //TODO: Try to think about how to abstract this to use for all situations of creating dom
  // //perhaps a recursive function of
  // createArtistDom(data) {//, params) {
  //   $('#/artists').remove();
  //   //const action = params.action;
  //   const dom = escapeTemplate`
  //     <ul id="artists" class="cards">
  //       ${each({
  //         data: data.artists.items,
  //         tag: 'li',
  //         txt: `<div>
  //                 <strong>{{name}}</strong>
  //               </div>
  //               <ul class="options">
  //                 <li>
  //                   <a href="#/related_{{id}}">
  //                     Related Musicians
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#/top_{{id}}">
  //                     Top Tracks
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#/albums_{{id}}">
  //                     Albums
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#/recommendations_{{id}}">
  //                     Create Radio Station
  //                   </a>
  //                 <li>
  //                 <li>
  //                   <a>
  //                     Other musicians from {{location}}
  //                   </a>
  //                 </li>
  //               </ul>
  //               `,
  //         attrs: {
  //           class:'artist',
  //           title: null,
  //           id: null,
  //           style: 'background-image:url({{images[0].url}})',
  //         }
  //       })}
  //     </ul>
  //   `;
  //
  //   createDOM({ html: dom, tag: 'container' });
  // }
  //
  // createTopTracksDOM(data) {
  //   const dom = escapeTemplate`
  //     <h2>Top Tracks for ${data.tracks[0].artists[0].name}</h2>
  //     <ul id="top-tracks" class="cards">
  //       ${each({
  //         data: data.tracks,
  //         tag: 'li',
  //         txt: `<div>
  //                 <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
  //               </div>
  //               <p>
  //                 from: <a href="#/album_{{album.id}}">{{album.name}}</a>
  //               </p>
  //               `,
  //         attrs: {
  //           class:'artist',
  //           title: null,
  //           id: null,
  //           style: 'background-image:url({{album.images[0].url}})',
  //         }
  //       })}
  //     </ul>
  //     `;
  //
  //   createDOM({ html: dom, tag: 'container' });
  // }
  //
  // createAlbumsDOM(data) {
  //   const dom = escapeTemplate`
  //   <h2>Albums by: ${data.items[0].artists[0].name}</h2>
  //     <ul id="top-tracks" class="cards">
  //       ${each({
  //         data: data.items,
  //         tag: 'li',
  //         txt: `<div>
  //                 <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
  //               </div>
  //               `,
  //         attrs: {
  //           class:'artist',
  //           title: null,
  //           id: null,
  //           style: 'background-image:url({{images[0].url}})',
  //         }
  //       })}
  //     </ul>
  //     `;
  //
  //   createDOM({ html: dom, tag: 'container' });
  // }
  //
  // createRecsDOM(data) {
  //   console.log(data)
  //   const dom = escapeTemplate`
  //   <h2>Playlist Inspired by: TEST</h2>
  //     <ul id="radio" class="cards">
  //       ${each({
  //         data: data.tracks,
  //         tag: 'li',
  //         txt: `<div>
  //                 <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
  //               </div>
  //               <p>
  //                 Album: <a href="#/album_{{album.id}}">{{album.name}}</a>
  //               </p>
  //               <p>By: <a href="#/artist_{{artists[0].name}}">{{artists[0].name}}</a>
  //               `,
  //         attrs: {
  //           class:'artist',
  //           title: null,
  //           id: null,
  //           style: 'background-image:url({{album.images[0].url}})',
  //         }
  //       })}
  //     </ul>
  //     `;
  //     createDOM({ html: dom, tag: 'container' });
  // }
}
