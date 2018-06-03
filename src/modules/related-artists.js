'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';
import { createArrayFromFusionData, each } from '../helpers/each-template';
import { iff } from '../helpers/if-template';
import { memoizeJSON, memoized, normalizeFusionResponse } from '../helpers/memoize';
import { addToStorage } from '../helpers/add-to-storage';
import { buildFusionUrl } from '../helpers/urls';


const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
})

export default class RelatedArtists {
  hasBackup() {
    return true;
  }

  //TODO: memoize this method; see javascript ninja book
  fetchRelatedArtists(id,name) {
    const baseUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT';
    const selectedCols = '*';
    const matchType = 'CONTAINS IGNORING CASE';
    const sortBy = '';
    const fusionId = '1C3pHT7Atw56oCceuNXvFiAv3a9msAAMTj5DwCJ4D';
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

    if (id) {
      var data = memoizeJSON({
        key: `related_${id}`,
        fn() {
          return fetch(url);
        }
      });
      addToStorage('hash', `/related/${id}/${name}`);
      return data;
    }
  }

  fetchRelatedArtistsSpotify(id, name) {
    const url = `https://api.spotify.com/v1/artists/${id}/related-artists`;

    const data = memoizeJSON({
      key: id,
      fn() {
        return fetch(url, {
          headers: auth_header
        });
      }
    });
    addToStorage('hash', `/related/${id}/${name}`);
    return data;
  }

  createRelatedArtistsDom(data, name) {
    let resolvedData;
    if (data.data) {
      //fusion table data
      resolvedData = createArrayFromFusionData(data.data, 'related', 20);
    } else {
      //spotify data
      resolvedData = data.spotify;
    }
  
    const dom = iff(resolvedData.length > 0,
    escapeTemplate`
      <h4>Similar Bands to ${name}</h4>
      <ul id="related-artists" class="cards">
        ${each({
          data: resolvedData,
          tag: 'li',
          txt: '<a href="#/artist/{{relatedName}}">{{relatedName}}</a>',
          attrs: {
            class: 'related-artist',
            id: null,
            style: 'background-image:url({{relatedImagesUrl}})'
          }
        })}
      </ul>
      `,
      `<p><strong>There are no artists related</strong</p>`);
    createDOM({ html: dom, tag: 'container' , clear: true });
  }
}
