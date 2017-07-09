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
        //parentClassProp: 'artist'
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

  setHash(str) {
    const regex = new RegExp(/\/#\//g);

    window.location.hash = str.replace(regex, '/');
  }

  getHash(str) {
    return window.location.hash;
  }

  getParamsFromHash(str) {
    const hash = str.replace(/#\//g, '').replace('#', ''),
     hashObj = this._createHashArgs(hash);

    let routeForData;
    if(hashObj.route) {
      routeMap[hashObj.route]['subRoutes']
        ? routeForData = this._checkSubRoute(routeMap[hashObj.route], hash)
        : routeForData = routeMap[hashObj.route];

      this.hashToData(routeForData, hashObj.id, hashObj.name);
    }
  }

  hashToData(route, id, name) {
    let className,
      prop,
      parentClass,
      parentClassProp;

    if(route.isSubRoute) {
      className = route.route.className;
      prop = route.route;
      parentClass = routeMap[route.route.parentClass].className;
      parentClassProp = routeMap[route.route.parentClass]

      return this._fetchData(parentClass, parentClassProp, name).then(() =>  {
        return this._fetchData(className, prop, id, name);
      });
    } else {
      className = routeMap[route.hash].className;
      prop = routeMap[route.hash];

      return this._fetchData(className, prop, id, name);
    }
  }

  _fetchData(className, prop, id, name) {
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
    const subRoute = route['subRoutes'].filter((sroute) => {
      return hash.indexOf(sroute.hash) > -1;
    });

    if(subRoute.length > 0) {
      return { route: subRoute[0], hash: subRoute[0].hash, isSubRoute: true };
    }
    return { route: route, hash: route.hash, isSubRoute: false };
  }

  _createHashArgs(hash) {
    let hashArr,
      route,
      id,
      name;

    hashArr = hash.split('/'),
    route = hashArr[0],
    id = hashArr[1],
    name = hashArr[2];

    return { id: id, route: route, name: name };
  }
}
