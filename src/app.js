'use strict'

import Artist from './modules/artist';
import relatedArtists from './modules/related-artists';
import $ from '../node_modules/jquery/dist/jquery.min';

const artist = new Artist();
const related = new relatedArtists()

export  default function init() {
  artist.fetchArtists().then((data) => {
    const dom = artist.createArtistDom(data.artists);
    createAppDom(dom, 'body')
  })
}

export function createAppDom(dom, tag) {
  //TODO:create a each/loop helper and import

    $(tag).html(dom);
}


// export function renderRelatedArtists(id) {
//   related.fetchRelatedArtists(id).then((data) => {
//     console.log(data)
//   })
// }

init();
