"use strict"

import Artist from './modules/artist';
import RelatedArtists from './modules/related-artists';
import Album from './modules/albums';
import ArtistInfo from './modules/artist-info';
import Geolocation from './modules/geolocation';
import Location from './modules/location'
//import Modal from './modules/create-modal';

const hash = window.location.hash.replace('#', '');
const artist = new Artist();
const related = new RelatedArtists();
const album = new Album();
const artistInfo = new ArtistInfo();
const geolocation = new Geolocation();
const location = new Location();

const routeMap = {
  artist: {
    className: artist,
    hash: 'artist',
    fetch: 'fetchArtists',
    fetchSpotify: 'fetchArtistsSpotify',
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
    fetchSpotify: 'fetchRelatedArtistsSpotify',
    dom: 'createRelatedArtistsDom',
  },
  top: {
    className: artist,
    hash: 'top',
    fetch: 'fetchTopTracks',
    fetchSpotify: 'fetchTopTracksSpotify', //need to add this method
    dom: 'createTopTracksDOM',
  },
  albums: {
    className: album,
    hash: 'albums',
    fetch: 'fetchAllAlbums',
    fetchSpotify: 'fetchAllAlbumsSpotify',
    dom: 'createAlbumsDOM',
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
  },
  geolocation: {
    className: geolocation,
    hash: 'geolocation',
    fetch: 'getGeolocation',
    dom: 'buildMap',
  },
  location: {
    className: location,
    hash: 'location',
    fetch: 'fetchLocationArtists',
    dom: 'createCityArtistsDOM'
  },
  city: {
    className: location,
    hash: 'city',
    fetch: 'fetchCityArtists',
    dom: 'createCityArtistsDOM'
  }
}

class Router {
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

  goBack() {
    window.history.back()
  }

  getParamsFromHash(str) {
    const hash = decodeURIComponent(str.replace(/#\//g, '').replace('#', '')),
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
      parentClassProp,
      parentOptions,
      options = {};

    if(route.isSubRoute) {
      className = route.route.className;
      prop = route.route;
      parentClass = routeMap[route.route.parentClass].className;
      parentClassProp = routeMap[route.route.parentClass]

      parentOptions = {
        parentClass,
        parentClassProp,
        name,
      }

      options = {
        className,
        prop,
        id,
        name,
      }

      return this._fetchData(parentOptions).then(() =>  {
        return this._fetchData(options);
      });
    } else {
      className = routeMap[route.hash].className;
      prop = routeMap[route.hash];
      options = {
        className,
        prop,
        id,
        name,
      }
      return this._fetchData(options);
    }
  }

  _fetchData(options) {
    const property = options.hasSpotifyBackup ? options.prop.fetchSpotify : options.prop.fetch;

    return options.className[property](options.id, options.name).then((data) => {
      if(!data.error) {
        if(options.name) {
          const name = options.name;
          return options.className[options.prop.dom](data,  name );
        } else {
          return options.className[options.prop.dom](data);
        }
      }
      // if problem with fusion tables, use spotify as a backup
      else if (data.error.code === 400 && options.className.hasBackup()) {
        options.hasSpotifyBackup = true;
        this._fetchData(options);
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

    hashArr = hash.split('/') || hash.split('_'),
    route = hashArr[0],
    id = hashArr[1],
    name = hashArr[2];

    return { id: id, route: route, name: name };
  }
}

export default Router;
