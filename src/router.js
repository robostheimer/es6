"use strict"

import Artist from './modules/artist';
import RelatedArtists from './modules/related-artists';

const hash = window.location.hash.replace('#', '');
const artist = new Artist();
const related = new RelatedArtists();


const routeMap = {
  artist: {
    className: artist,
    hash: 'artist',
    fetch: 'fetchArtists',
    dom: 'createArtistDom',
  },
  related: {
    className: related,
    hash: 'related',
    fetch: 'fetchRelatedArtists',
    dom: 'createRelatedArtistsDom'
  },
  top: {
    className: artist,
    hash: 'top',
    fetch: 'fetchTopTracks',
    dom: 'createTopTracksDOM'
  },
  albums: {
    className: artist,
    hash: 'albums',
    fetch: 'fetchAlbums',
    dom: 'createAlbumsDOM'
  },
  recommendations: {
    className: artist,
    hash: 'recommendations',
    fetch: 'fetchRecommendations',
    dom: 'createRecsDOM'
  }
}

export default class Router {

  logHash() {
    console.log(hash);
  }

  makeHash(route, id) {
    document.getElementById('container').innerHTML = '';
    window.location.hash = `${route}_${id}`;
    this.hashToData(route, id);
  }

  hashToData(route, id) {
    const className =  routeMap[route].className;
    const prop = routeMap[route];

    return className[prop.fetch](id).then((data) => {
      if(!data.error) {
        return className[prop.dom](data);
      }
      //reloads in case of auth error to get user back into auth flow
      else if(data.error.status === 401) {
        debugger;
        window.location.reload();
        sessionStorage.clear();
      } else {
        return 'There was an error processing your request. Please try again.';
        window.location.reload();
      }

    })
  }
}
