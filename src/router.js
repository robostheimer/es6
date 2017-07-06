"use strict"

import Artist from './modules/artist';
import RelatedArtists from './modules/related-artists';
import Album from './modules/albums';
import ArtistInfo from './modules/artist-info';

const hash = window.location.hash.replace('#', '');
const artist = new Artist();
const related = new RelatedArtists();
const album = new Album();
const artistInfo = new ArtistInfo()


const routeMap = {
  artist: {
    className: artist,
    hash: 'artist',
    fetch: 'fetchArtists',
    dom: 'createArtistDom',
    subRoutes: [
      {
        hash: 'info',
        className: artistInfo,
        parentClass: 'artist',
        fetch: 'fetchArtistInfo',
        dom: 'createInfoDOM',
      }
    ]
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

  makeHash(...args) {
    let params = args[0],
      route = params.route,
      name = params.name,
      id = params.id,
      routeForData,
      hash;

    document.getElementById('container').innerHTML = '';
    if(name) {
      hash = `/${route}/${id}/${name}`;
      window.location.hash = hash;
    } else {
      hash = `/${route}/${id}`;
      window.location.hash = hash;
    }
    routeMap[route]['subRoutes'] ? routeForData = this._checkSubRoute(routeMap[route], hash ) : routeForData = routeMap[route];
    this.hashToData(routeForData, id, name);
  }

  hashToData(route, id, name) {
    let className,
      prop;

    if(route.isSubRoute) {
      className = route.route.className;
      prop = route.route;
    } else {
      className =  routeMap[route.hash].className;
      prop = routeMap[route.hash];
    }

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

  _checkSubRoute(route, hash) {
    // TODO: Check if the hash matches any of the subRoutes
    // If so make the route, the subRoute
    const subRoute = route['subRoutes'].filter((sroute) => {
      return hash.indexOf(sroute.hash) > -1;
    });

    if(subRoute.length > 0) {
      return { route: subRoute[0], hash: subRoute[0].hash, isSubRoute: true };
    }
    return { route: route, hash: route.hash, isSubRoute: false };
  }
}
