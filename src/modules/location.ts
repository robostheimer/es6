"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { memoizeJSON } from "../helpers/memoize";
import { each } from "../helpers/each-template";
import { iff } from "../helpers/if-template";
import { addToStorage } from "../helpers/add-to-storage";
import { baseUrl } from "../app";
import { flattenArrayOfObjects, sortArrAsc } from "../helpers/arrays";
import { normalizeParams } from "../helpers/strings";
import PlaylistCard from "./playlist-card";
import { map } from "../app";

const playlistCard = new PlaylistCard();
let innerLimit = 0;
let outerLimit = 50;

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

      const url = paramsStr
        ? `${baseUrl}/artistsMultiple/and~Lat:${lat}_Lng:${lng}_${paramsStr}?limit=50`
        : `${baseUrl}/artistsMultiple/and~Lat:${lat}_Lng:${lng}?limit=50`;

      const hash = paramsStr
        ? `/location/${lat_lng}/artists_${paramsStr}/`
        : `/location/${lat_lng}/artists/`;
      const data = memoizeJSON({
        key: hash,
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

    const url = paramsStr
      ? `${baseUrl}/artistsMultiple/and~City:${city}_${paramsStr}?limit=50`
      : `${baseUrl}/artistsMultiple/and~City:${city}?limit=50`;
    const hash = paramsStr
      ? `/city/${city}/artists/${params}/`
      : `/city/${city}/artists/`;

    const data = memoizeJSON({
      key: hash,
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
      paramsStr = normalizeParams(params, "_", "or", "");
    }
    if (lat_lng) {
      const splitter = lat_lng.split(",");
      const lat = splitter[0];
      const lng = splitter[1];

      const url = paramsStr
        ? `${baseUrl}/topTracksMultiple/and~Lat:${lat}_Lng:${lng}/params?limit=50`
        : `${baseUrl}/topTracksMultiple/and~Lat:${lat}_Lng:${lng}?limit=50`;
      const hash = paramsStr
        ? `/location/${lat_lng}/tracks/${params}/`
        : `/location/${lat_lng}/tracks/`;
      const data = memoizeJSON({
        key: hash,
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
      paramsStr = normalizeParams(params, "_", "or", "");
    }

    const url = paramsStr
      ? `${baseUrl}/topTracksMultiple/and~City:${city}_${paramsStr}?limit=50`
      : `${baseUrl}/topTracksMultiple/and~City:${city}?limit=50`;
    const hash = paramsStr
      ? `/city/${city}/tracks${params}/`
      : `/city/${city}/tracks/`;
    const data = memoizeJSON({
      key: hash,
      fn() {
        return fetch(url);
      }
    });
    addToStorage("hash", hash);
    // flatten topTracks from all artists into an array and sort via popularity
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
    createDOM({ html: dom, tag: "#container", clear: true });
  }

  createCityMapDOM(data) {
    const mapData = { data, tag: "#container" };
    map.buildMap(mapData, true);
  }

  createCityTracksDOM(data) {
    // take all top tracks and flatten into one big tracks array
    // sort via popularity

    const flattenedData = sortArrAsc(
      flattenArrayOfObjects(data, "topTracks"),
      "popularity",
      "num",
      false
    );
    const slicedArr = flattenedData.slice(innerLimit, outerLimit);
    const filteredData = data.filter(item => {
      return item.topTracks[0] && item.topTracks[0].album;
    });

    const mapData = { data, tag: "#container" };
    map.buildMap(mapData, true);
    const dom = iff(
      data.length > 0,
      escapeTemplate`
        <div id="playlist">
          <section class="cards-header">
            <h4> Musicians from ${filteredData[0].City}</h4>
          </section>
          <ul class="cards">
          </ul>
        </div>
        `,
      `<p><strong>There are no artists related</strong</p>`
    );

    createDOM({ html: dom, tag: "#container", clear: false });
    slicedArr.forEach(function(item, index) {
      playlistCard.createCard(item);
    });
  }
}
