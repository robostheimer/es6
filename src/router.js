"use strict"

import Artist from './modules/artist';
import RelatedArtists from './modules/related-artists';

const hash = window.location.hash.replace('#', '');
const artist = new Artist();
const related = new RelatedArtists();


const routeMap = {
  artist: {
    className: artist,
    fetch: 'fetchArtists',
    dom: 'createArtistDom',
  },
  related: {
    className: related,
    fetch: 'fetchRelatedArtists',
    dom: 'createRelatedArtistsDom'
  },
}

export default class Router {

  logHash() {
    console.log(hash);
  }

  routeToHash(route, id) {
    window.location.hash = `${route}_${id}`;
    const className =  routeMap[route].className;
    const prop = routeMap[route];

    className[prop.fetch](id).then((data) => {
      className[prop.dom](data);
    });
  }
}
