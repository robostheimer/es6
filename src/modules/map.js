"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
import Geolocation from "./geolocation";
import Location from "./location";
import { router } from "../app";

const geolocation = new Geolocation();
const location = new Location();

export default class Map {
  fetchGeolocation() {
    return geolocation.getGeolocation().then(options => {
      if (options) {
        return this.fetchTopTracksFromLocation(
          `${options.latitude},${options.longitude}`
        ).then(data => {
          const mapMarkers = this.sortMarkers(data);
          const options = { tag: "#container", data };
          return options;
        });
      }
      const position = {
        position: { latitude: 51.506325, longitude: -0.127144 },
        tag: "#container"
      };

      return this.fetchTopTracksFromLocation(
        `${position.position.latitude},${position.position.longitude}`
      ).then(data => {
        const mapMarkers = this.sortMarkers(data);
        const options = { tag: "#container", data };
        return options;
      });
    });
  }

  fetchTopTracksFromLocation(position) {
    return location.fetchTopTracksFromLocation(position).then(data => {
      return data;
    });
  }

  buildMap(data, clearMap = true) {
    if (clearMap && markers) {
      markers.forEach(function(item) {
        map.removeLayer(item);
      });
    }

    const mapDom = escapeTemplate`
      <div id="map" style="height: 90vh;">
      </div>`;
    const lat = data.data[0].Lat;
    const lng = data.data[0].Lng;
    const container = data.tag;
    const songs = data.data;
    const markers = [];
    let marker_content;
    if (router.getHash().indexOf("map") > -1) {
      router.setHash(`#/map/${songs[0].City}`);
    }

    createDOM({ html: mapDom, tag: container, clear: clearMap });
    const map = L.map("map").setView([lat, lng], 10);
    const icon = L.icon({
      iconUrl: "/assets/genre_icons/marker_sm.svg"
    });
    var circle = L.circle([lat, lng], 125, {
      color: "#c53526",
      fillColor: "#c53526",
      fillOpacity: 0.15
    }).addTo(map);

    let combinedLocations = this.sortMarkers(songs);
    for (const p in combinedLocations) {
      console.log(combinedLocations[p].songsStr);
      L.marker([combinedLocations[p][0].Lat, combinedLocations[p][0].Lng], {
        icon
      })
        .bindPopup(combinedLocations[p].songsStr)
        .addTo(map);
    }

    L.tileLayer(
      "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: "abcd",
        minZoom: 0,
        maxZoom: 20,
        center: [50, 20],
        animate: true,
        ext: "png"
      }
    ).addTo(map);

    map.scrollWheelZoom.disable();
    map.zoomControl.options.position = "topright";
  }

  sortMarkers(data) {
    return data.reduce((accum, song) => {
      const latLng = `${song.Lat}_${song.Lng}`;
      if (accum[latLng]) {
        accum[latLng].push(song);
        if (song.topTracks.length) {
          accum[latLng].songsStr += `
            <h4>${song.City}</h4>
            <div class="popup-artist-name">${song.Name}</div>
            <div class="popup-song-name">${song.topTracks[0].name}</div>
          `;
        }
      } else {
        accum[latLng] = [];
        accum[latLng].songsStr = "";
        if (song.topTracks.length) {
          accum[latLng].songsStr += `
          <h4>${song.City}</h4>
          <div class="popup-artist-name">${song.Name}</div>
          <div class="popup-song-name">${song.topTracks[0].name}</div>
        `;
        }

        accum[latLng].push(song);
      }
      return accum;
    }, {});
  }
}
