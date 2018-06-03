'use strict'

import { createDOM, addAjaxAction, escapeTemplate, clearDOM } from '../helpers/create-dom';
import { createArrayFromFusionData, each } from '../helpers/each-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
import { iff } from '../helpers/if-template';
import { addToStorage } from '../helpers/add-to-storage';
import Artist from './artist';
import { buildFusionUrl } from '../helpers/urls';

const artist = new Artist

//TODO: Need to add album and track class/components to support linking.
export default class Location {
  fetchLocationArtists(lat_lng_ratio) {
      if(lat_lng_ratio) {
        const splitter = lat_lng_ratio.split(',');
        const lat = splitter[0].slice(0, 5);
        const lng = splitter[1].slice(0, 5);
        const ratio = 0.5
        const min_lat = parseFloat(lat) - ratio;
        const max_lat = parseFloat(lat) + ratio;
        const min_lng = parseFloat(lng) - ratio;
        const max_lng = parseFloat(lng) + ratio;
        const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
    
        const url = `${baseUrl}+*+FROM+1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv+WHERE+Lat%20%3E=%20%27${min_lat}%27+And+Lat%20%3C=%20%27${max_lat}%27+And+Lng%3E=${min_lng}+And+Lng%3C=${max_lng}+ORDER%20BY+spotifyPopularity+DESC&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0`

        const data =  memoizeJSON({key: lat_lng_ratio,
          fn() {
            return fetch(url);
          }
        });
        addToStorage('hash', `/location/${lat_lng_ratio}`);
        
        return data;
    }
  }

  fetchCityArtists(city) {
    debugger;
    const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';

    const url = `${baseUrl}+*+FROM+1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv+WHERE+City+CONTAINS%20IGNORING%20CASE%27${city}%27+ORDER%20BY+spotifyPopularity+DESC&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0`

    const data = memoizeJSON({
      key: city,
      fn() {
        return fetch(url);
      }
    });
    addToStorage('hash', `/city/${city}`);

    return data;

  }

  createCityArtistsDOM(data) {
      const dom = iff(data.data.length > 0,
      escapeTemplate`
      <h4> Musicians from ${data.data[0].City}
      <ul id="related-artists" class="cards">
        ${each({
            data: data.data,
            tag: 'li',
            txt: '<a href="#/artist/{{Name}}">{{Name}}</a>',
            attrs: {
              class: 'related-artist',
              id: null,
              style: 'background-image:url({{spotifyImageUrl}})'
            }
          })}
      </ul>
      `,
        `<p><strong>There are no artists related</strong</p>`);
      createDOM({ html: dom, tag: 'container', clear: true });
    }
  }