"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { memoizeJSON } from "../helpers/memoize";
import { each } from "../helpers/each-template";
import { iff } from "../helpers/if-template";
import { addToStorage } from "../helpers/add-to-storage";
import Artist from "./artist";
import {
  buildFusionUrl,
  buildComplexQuery,
  buildComplexFusionUrl
} from "../helpers/urls";

import { normalizeParams } from "../helpers/strings";

const artist = new Artist();
const baseUrl = "https://api.musicwhereyour.com";

//TODO: Need to add album and track class/components to support linking.
export default class Location {
  fetchLocationArtists(lat_lng, params) {
    let paramsStr;
    if (params) {
      paramsStr = normalizeParams(params, "_", "or", "spotify");
    }
    if (lat_lng) {
      const splitter = lat_lng.split(",");
      const lat = splitter[0];
      const lng = splitter[1];
      // const ratio = 0.15;
      // const min_lat = parseFloat(lat) - ratio;
      // const max_lat = parseFloat(lat) + ratio;
      // const min_lng = parseFloat(lng) - ratio;
      // const max_lng = parseFloat(lng) + ratio;
      // const baseUrl =
      //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
      // const fusionId = "1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv";
      // const sortBy = "+spotifyPopularity+DESC";
      // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";

      const url = paramsStr
        ? `${baseUrl}/artistsMultiple/and~Lat:${lat}_Lng:${lng}_${paramsStr}?limit=50`
        : `${baseUrl}/artistsMultiple/and~Lat:${lat}_Lng:${lng}?limit=50`;

      const hash = paramsStr
        ? `/location/${lat_lng}/artists_${paramsStr}`
        : `/location/${lat_lng}/artists`;
      const data = memoizeJSON({
        key: `tracks_${lat_lng}`,
        fn() {
          return fetch(url);
        }
      });
      addToStorage("hash", hash);

      return data;
    }
  }

  fetchCityArtists(city, params) {
    let paramsStr;
    if (params) {
      paramsStr = normalizeParams(params, "_", "or", "spotify");
    }
    // const baseUrl =
    //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
    // const selectedCols = "*";
    // const matchType = "CONTAINS IGNORING CASE";
    // const sortBy = "Order By spotifyPopularity+DESC";
    // const fusionId = "1g-yJYLrmTDGBDTPp1o2hFdBmFhC4z2pvjE0vlEXv";
    // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
    // const where = "City";
    // const whereQuery = city;
    // const options = {
    //   baseUrl,
    //   fusionId,
    //   selectedCols,
    //   key,
    //   matchType,
    //   sortBy,
    //   where,
    //   whereQuery
    // };

    // const url = buildFusionUrl(options);
    const url = paramsStr
      ? `${baseUrl}/artistsMultiple/and~City:${city}_${paramsStr}?limit=50`
      : `${baseUrl}/artistsMultiple/and~City:${city}?limit=50`;
    const hash = paramsStr
      ? `/city/${city}/artists/${params}`
      : `/city/${city}/artists`;

    const data = memoizeJSON({
      key: city,
      fn() {
        return fetch(url);
      }
    });
    addToStorage("hash", hash);

    return data;
  }

  fetchTopTracksFromLocation(lat_lng, params) {
    let paramsStr;
    if (params) {
      paramsStr = normalizeParams(params, "_", "or");
    }
    if (lat_lng) {
      const splitter = lat_lng.split(",");
      const lat = splitter[0];
      const lng = splitter[1];
      // const ratio = 0.15;
      // const min_lat = parseFloat(lat) - ratio;
      // const max_lat = parseFloat(lat) + ratio;
      // const min_lng = parseFloat(lng) - ratio;
      // const max_lng = parseFloat(lng) + ratio;
      // const baseUrl =
      //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
      // const fusionId = "1b9_3oSaFIp_afMrbASc48DUTTyA2N4V2Xwg4TYC1";
      // const sortBy = "+topTracksPopularity0+DESC";
      // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
      // const limit = 100;

      const url = paramsStr
        ? `${baseUrl}/topTracksMultiple/and~Lat:${lat}_Lng:${lng}/params?limit=50`
        : `${baseUrl}/topTracksMultiple/and~Lat:${lat}_Lng:${lng}?limit=50`;
      const hash = paramsStr
        ? `/location/${lat_lng}/tracks/${params}`
        : `/location/${lat_lng}/tracks`;
      const data = memoizeJSON({
        key: `tracks_${lat_lng}`,
        fn() {
          return fetch(url);
        }
      });
      addToStorage("hash", hash);

      return data;
    }
  }

  fetchTopTracksFromCity(city, params) {
    let paramsStr;
    if (params) {
      paramsStr = normalizeParams(params, "_", "or");
    }
    // paramsObj.city = [city];
    // if (city) {
    //   const selectedCols = "*";
    //   const baseUrl =
    //     "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
    //   const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
    //   const query = buildComplexQuery(paramsObj);
    //   const fusionId = "1b9_3oSaFIp_afMrbASc48DUTTyA2N4V2Xwg4TYC1";
    //   const sortBy = "Order By topTracksPopularity0+DESC";
    //   const limit = 100;
    //   const options = {
    //     baseUrl,
    //     fusionId,
    //     selectedCols,
    //     key,
    //     sortBy,
    //     query,
    //     limit
    //   };
    //const url = buildComplexFusionUrl(options);
    const url = paramsStr
      ? `${baseUrl}/topTracksMultiple/and~City:${city}_${paramsStr}?limit=50`
      : `${baseUrl}/topTracksMultiple/and~City:${city}?limit=50`;
    const hash = paramsStr
      ? `/city/${city}/tracks${params}`
      : `/city/${city}/tracks`;
    const data = memoizeJSON({
      key: params ? `tracks_${city}_${paramsStr}` : `tracks_${city}`,
      fn() {
        return fetch(url);
      }
    });
    addToStorage("hash", hash);

    return data;
  }

  createCityArtistsDOM(data) {
    const dom = iff(
      data.length > 0,
      escapeTemplate`
      <h4> Musicians from ${data[0].City}
      <ul id="related-artists" class="cards">
        ${each({
          data: data,
          tag: "li",
          txt: '<a href="#/artist/{{Name}}">{{Name}}</a>',
          attrs: {
            class: "related-artist",
            id: null,
            style: "background-image:url({{spotify.images[0].url}})"
          }
        })}
      </ul>
      `,
      `<p><strong>There are no artists related</strong</p>`
    );
    createDOM({ html: dom, tag: "container", clear: true });
  }

  createCityTracksDOM(data) {
    // let resolvedData = data.data.map(item => {
    //   return createArrayFromFusionData(item, "topTracks", 20, [
    //     "Name",
    //     "Sid",
    //     "Lat",
    //     "Lng",
    //     "City",
    //     "genres0",
    //     "genres1",
    //     "genres2",
    //     "genres3",
    //     "genres4"
    //   ]);
    // }); //need to debug the createArrayFromFusionData method
    // let flattenedArr = flatten(resolvedData);
    // let sortedData = removeDuplicatesArrObj(
    //   sortObjDsc(flattenedArr, "topTracksPopularity", "str", true),
    //   "topTracksId"
    // );
    //console.log(data);
    const filteredData = data.filter(item => {
      return item.topTracks[0] && item.topTracks[0].album;
    });
    const dom = iff(
      data.length > 0,
      escapeTemplate`
        <h4> Musicians from ${filteredData[0].City}
        <ul id="related-artists" class="cards">
          ${each({
            data: filteredData,
            tag: "li",
            txt:
              '<div><a href="{{topTracks[0].name}}">{{topTracks[0].name}}</a></div><div>By <a href="#/artist/{{Name}}">{{Name}}</a></div>',
            attrs: {
              class: "related-artist",
              id: null,
              style:
                "background-image:url({{topTracks[0].album.images[0].url}})"
            }
          })}
        </ul>
        `,
      `<p><strong>There are no artists related</strong</p>`
    );
    createDOM({ html: dom, tag: "container", clear: true });
  }
}
