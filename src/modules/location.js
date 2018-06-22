'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';
import { memoizeJSON } from '../helpers/memoize';
import { createArrayFromFusionData, each } from '../helpers/each-template';
import { flatten, sortObjDsc, removeDuplicatesArrObj } from '../helpers/arrays';
import { createArray, normalizeParams } from '../helpers/strings';
import { iff } from '../helpers/if-template';
import { addToStorage } from '../helpers/add-to-storage';
import Artist from './artist';
import { buildFusionUrl, buildComplexQuery, buildComplexFusionUrl } from '../helpers/urls';

const artist = new Artist

//TODO: Need to add album and track class/components to support linking.
export default class Location {
  fetchLocationArtists(lat_lng) {
      if(lat_lng) {
        const splitter = lat_lng.split(',');
        const lat = splitter[0].slice(0, 5);
        const lng = splitter[1].slice(0, 5);
        const ratio = 0.15
        const min_lat = parseFloat(lat) - ratio;
        const max_lat = parseFloat(lat) + ratio;
        const min_lng = parseFloat(lng) - ratio;
        const max_lng = parseFloat(lng) + ratio;
        const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
        const fusionId = '1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv'
        const sortBy = '+spotifyPopularity+DESC';
        const key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0'

        const url = `${baseUrl}+*+FROM+${fusionId}+WHERE+Lat%20%3E=%20%27${min_lat}%27+And+Lat%20%3C=%20%27${max_lat}%27+And+Lng%3E=${min_lng}+And+Lng%3C=${max_lng}+ORDER%20BY${sortBy}&key=${key}`

        const data = memoizeJSON({
          key: `tracks_${lat_lng}`,
          fn() {
            return fetch(url);
          }
        });
        addToStorage('hash', `/location/${lat_lng}/artists`);
        
        return data;
    }
  }

  fetchCityArtists(city) {
    const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
    const selectedCols = '*';
    const matchType = 'CONTAINS IGNORING CASE';
    const sortBy = 'Order By spotifyPopularity+DESC';
    const fusionId = '1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv'
    const key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
    const where = 'City';
    const whereQuery = city;
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

    //const url = `${baseUrl}+*+FROM+1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv+WHERE+City+CONTAINS%20IGNORING%20CASE%27${city}%27+ORDER%20BY+spotifyPopularity+DESC&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0`

    const data = memoizeJSON({
      key: city,
      fn() {
        return fetch(url);
      }
    });
    addToStorage('hash', `/city/${city}/artists`);

    return data;

  }

  fetchTopTracksFromLocation(lat_lng) {
    if (lat_lng) {
      const splitter = lat_lng.split(',');
      const lat = splitter[0].slice(0, 5);
      const lng = splitter[1].slice(0, 5);
      const ratio = 0.15
      const min_lat = parseFloat(lat) - ratio;
      const max_lat = parseFloat(lat) + ratio;
      const min_lng = parseFloat(lng) - ratio;
      const max_lng = parseFloat(lng) + ratio;
      const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
      const fusionId = '1b9_3oSaFIp_afMrbASc48DUTTyA2N4V2Xwg4TYC1'
      const sortBy ='+topTracksPopularity0+DESC';
      const key ='AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
      const limit = 100;

      const url = `${baseUrl}+*+FROM+${fusionId}+WHERE+Lat%20%3E=%20${min_lat}+And+Lat%20%3C=%20${max_lat}+And+Lng%3E=${min_lng}+And+Lng%3C=${max_lng}+ORDER%20BY${sortBy}+LIMIT+${limit}&key=${key}`

      const data = memoizeJSON({
        key: `tracks_${lat_lng}`,
        fn() {
          return fetch(url);
        }
      });
      addToStorage('hash', `/location/${lat_lng}/tracks`);

      return data;
    }
  }

  fetchTopTracksFromCity(city, params) {
    const paramsObj = normalizeParams(params, '&', 'Or');

    paramsObj.city = [city];
    if (city) {
      const selectedCols = '*';
      const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
      const key = 'AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
      const query = buildComplexQuery(paramsObj);
      const fusionId = '1b9_3oSaFIp_afMrbASc48DUTTyA2N4V2Xwg4TYC1'
      const sortBy = 'Order By topTracksPopularity0+DESC';
      const limit = 100;
      const options = {
        baseUrl,
        fusionId,
        selectedCols,
        key,
        sortBy,
        query,
        limit
      };
      const url = buildComplexFusionUrl(options);
 
      const data = memoizeJSON({
        key: params ? `tracks_${city}_${params}` :`tracks_${city}`,
        fn() {
          return fetch(url);
        }
      });
      addToStorage('hash', `/city/${city}/tracks/${params || ''}`);

      return data;
    }
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

  createCityTracksDOM(data) {
    let resolvedData = data.data.map(item => {
      return createArrayFromFusionData(item, 'topTracks', 20, ['Name', 'Sid', 'Lat', 'Lng', 'City','genres0', 'genres1', 'genres2', 'genres3', 'genres4'])
    });//need to debug the createArrayFromFusionData method
    let flattenedArr = flatten(resolvedData);
    let sortedData = removeDuplicatesArrObj(sortObjDsc(flattenedArr, 'topTracksPopularity', 'str', true), 'topTracksId')

    const dom = iff(sortedData.length > 0,
      escapeTemplate`
        <h4> Musicians from ${sortedData[0].City}
        <ul id="related-artists" class="cards">
          ${each({
          data: sortedData,
          tag: 'li',
          txt: '<div><a href="{{topTracksName}}">{{topTracksName}}</a></div><div>By <a href="#/artist/{{Name}}">{{Name}}</a></div>',
          attrs: {
            class: 'related-artist',
            id: null,
            style: 'background-image:url({{topTracksAlbumImagesUrl}})'
          }
        })}
        </ul>
        `,
      `<p><strong>There are no artists related</strong</p>`);
    createDOM({ html: dom, tag: 'container', clear: true });
  }
}