'use strict'

import Artist from './modules/artist';
import relatedArtists from './modules/related-artists';
import $ from '../node_modules/jquery/dist/jquery.min';

const artist = new Artist();
const related = new relatedArtists()

export  default function init() {
  artist.fetchArtists().then((data) => {
    artist.createArtistDom(data.artists, 'click');
  })
}


// export function renderRelatedArtists(id) {
//   related.fetchRelatedArtists(id).then((data) => {
//     console.log(data)
//   })
// }

init();
