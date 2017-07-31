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
      modal.createModal()
      createDOM({ html: loaderDom, tag:'modal-container' });
      return new Promise ((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({ position: position.coords, tag: 'modal-container' });
        },
        (error) => {
          alert('There was an error!')
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
    const lat = options.position.latitude;
    const lng = options.position.longitude;
    const ratio = .05;
    const tag = options.tag

    this.fetchCity(lat, lng, ratio).then((data) => {
      const location = data.rows[0].join(', ');
      const city = data.rows[0][0];
      const titleDom = escapeTemplate `
        You are in ${location}
      `;


      createDOM({ html: titleDom, tag:'modal-headline', clear: true });
      modal.createButtons([
        {
          id: 'yes',
          value: `See Musicians from ${city}`,
          route: () => {}, //eventually will use router.getHash()
        }, {
          id: 'no',
          value: 'No thanks',
          route: () => {}, //eventually will use router.getHash()
        }
      ]);
      map.buildMap(lat, lng, tag);
    })



  }

  fetchCity(lat, lng, ratio) {
    const url = `https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+CityName%2C+Region%2C+CountryID+FROM+1B8NpmfiAc414JhWeVZcSqiz4coLc_OeIh7umUDGs+WHERE+Lat+%3C=${lat+ratio}+AND+Lat%3E=${lat - ratio}+AND+Long%3C=${lng + ratio}+AND+Long%3E=${lng - ratio}&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0`;
    if(lat && lng && ratio) {
      var data =  memoizeJSON({key: `geolocation_${lat}_${lng}`,
        fn() {
          return fetch(url);
        }
      });

      return data;
    }
  }

  fetchArtistsFromLocation() {
    
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
