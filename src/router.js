"use strict"

import Artist from './modules/artist';
import RelatedArtists from './modules/related-artists';
import Album from './modules/albums';

const hash = window.location.hash.replace('#', '');
const artist = new Artist();
const related = new RelatedArtists();
const album = new Album();


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
    className: album,
    hash: 'albums',
    fetch: 'fetchAllAlbums',
    dom: 'createAlbumsDOM'
  },
  album: {
    className: album,
    hash: 'album',
    fetch: 'fetchAlbum',
    dom: 'createAlbumDOM'
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

  makeHash(route, id, name) {
    document.getElementById('container').innerHTML = '';
    if(name) {
      window.location.hash = `${route}_${id}_${name}`;
    } else {
      window.location.hash = `${route}_${id}`;
    }

    this.hashToData(route, id, name);
  }

  hashToData(route, id, name) {
    const className =  routeMap[route].className;
    const prop = routeMap[route];

    return className[prop.fetch](id, name).then((data) => {
      if(!data.error) {
        if(name) {
          return className[prop.dom]({ data, name });
        } else {
          return className[prop.dom](data);
        }
      }
      //reloads in case of auth error to get user back into auth flow
      else if(data.error.status === 401) {
        window.location.reload();
        sessionStorage.clear();
      } else {
        return 'There was an error processing your request. Please try again.';
        window.location.reload();
      }

    })
  }
}
