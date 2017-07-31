'use strict'

import { createDOM, addAjaxAction, escapeTemplate } from '../helpers/create-dom';
//import { each } from '../helpers/each-template';
import { iff } from '../helpers/if-template';
import { memoizeJSON, memoized } from '../helpers/memoize';
//import { addToStorage } from '../helpers/add-to-storage';

//TODO: Need to add album and track class/components to support linking.
export default class Map {

  buildMap(lat, lng, container) {
    const mapDom = escapeTemplate`
      <div id="map" style="height: 200px;">
      </div>`

    createDOM({ html: mapDom, tag: container, clear: true });
    const map = L.map('map').setView([lat, lng], 14);

    var circle = L.circle([lat, lng], 125, {
        color: '#428bca',
        fillColor: '#428bca',
        fillOpacity: 0.15
      }).addTo(map);


    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      center: [50, 20],
      animate: true,
      ext: 'png'
    }).addTo(map);
  }
}
