'use strict'

import Artist from './modules/artist';
import relatedArtists from './modules/related-artists';
import $ from '../node_modules/jquery/dist/jquery.min';

const artist = new Artist();
const related = new relatedArtists()

export  default function init() {
  artist.fetchArtists().then((data) => {
    console.log(data);
    createAppDom(data.artists);
  })
}

export function createAppDom(data) {
  //TODO:create a each/loop helper and import
  const dom = `
  <ul id="artists">
    ${data.map(artist => `
      <li class="artist" id="${artist.id}">
        ${artist.name}
      </li>
      `).join('')}
  </ul>
  `;

  $('body').html(dom);

  //Action on artists component
  $('#artists').click((e) => {
    renderRelatedArtists(e.target.id)
  });

}



export function renderRelatedArtists(id) {
  related.fetchRelatedArtists(id).then((data) => {
    console.log(data)
  })
}

init();
