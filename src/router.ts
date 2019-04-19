"use strict";

import Artist from "./modules/artist";
import RelatedArtists from "./modules/related-artists";
import Album from "./modules/albums";
import ArtistInfo from "./modules/artist-info";
import Location from "./modules/location";
import Map from "./modules/map";

const hash = window.location.hash.replace("#", "");
const artist = new Artist();
const related = new RelatedArtists();
const album = new Album();
const artistInfo = new ArtistInfo();
const location = new Location();
const map = new Map();

const routeMap = {
  "": {
    className: map,
    hash: "map",
    fetch: "fetchGeolocation",
    dom: "buildMap"
  },
  "#": {
    className: map,
    hash: "map",
    fetch: "fetchGeolocation",
    dom: "buildMap"
  },
  albums: {
    className: album,
    hash: "albums",
    fetch: "fetchAllAlbums",
    fetchSpotify: "fetchAllAlbumsSpotify",
    dom: "createAlbumsDOM"
  },
  album: {
    className: album,
    hash: "album",
    fetch: "fetchAlbum",
    dom: "createAlbumDOM"
  },
  artist: {
    className: artist,
    hash: "artist",
    fetch: "fetchArtists",
    fetchSpotify: "fetchArtistsSpotify",
    dom: "createArtistDom",
    subRoutes: [
      {
        hash: "info",
        className: artistInfo,
        parentClass: "artist",
        fetch: "fetchArtistInfo",
        dom: "createInfoDOM"
      }
    ]
  },
  city: {
    className: location,
    hash: "city",
    fetch: "fetchTopTracksFromCity",
    dom: "createCityMapDOM",
    subRoutes: [
      {
        hash: "tracks",
        className: location,
        parentClass: "location",
        fetch: "fetchTopTracksFromCity",
        dom: "createCityTracksDOM"
      },
      {
        hash: "tracks/:genres",
        className: location,
        parentClass: "location",
        fetch: "fetchTopTracksFromCity",
        dom: "createCityTracksDOM"
      },
      {
        hash: "artists",
        className: location,
        parentClass: "location",
        fetch: "fetchCityArtists",
        dom: "createCityArtistsDOM"
      },
      {
        hash: "artists/:genres",
        className: location,
        parentClass: "location",
        fetch: "fetchCityArtists",
        dom: "createCityArtistsDOM"
      }
    ]
  },

  location: {
    className: location,
    hash: "location",
    fetch: "fetchLocationArtists",
    dom: "createCityArtistsDOM",
    subRoutes: [
      {
        hash: "tracks",
        className: location,
        parentClass: "location",
        fetch: "fetchTopTracksFromLocation",
        dom: "createCityTracksDOM"
      }
    ]
  },
  map: {
    className: map,
    hash: "map",
    fetch: "fetchGeolocation",
    dom: "buildMap"
  },
  recommendations: {
    className: artist,
    hash: "recommendations",
    fetch: "fetchRecommendations",
    dom: "createRecsDOM"
  },
  related: {
    className: related,
    hash: "related",
    fetch: "fetchRelatedArtists",
    fetchSpotify: "fetchRelatedArtistsSpotify",
    dom: "createRelatedArtistsDom"
  },
  top: {
    className: artist,
    hash: "top",
    fetch: "fetchTopTracks",
    fetchSpotify: "fetchTopTracksSpotify", //need to add this method
    dom: "createTopTracksDOM"
  }
};

class Router {
  getBaseUrl() {
    return window.location.host;
  }

  logHash() {
    console.log(hash);
  }

  setHash(str) {
    const regex = new RegExp(/\/#\//g);

    window.location.hash = str.replace(regex, "/");
  }

  getHash() {
    return window.location.hash;
  }

  goBack() {
    window.history.back();
  }

  getParamsFromHash(str) {
    const hash = decodeURIComponent(str.replace(/#\//g, "").replace("#", "")),
      hashObj = this._createHashArgs(hash);

    let routeForData;
    if (hashObj.route) {
      routeMap[hashObj.route]["subRoutes"]
        ? (routeForData = this._checkSubRoute(routeMap[hashObj.route], hash))
        : (routeForData = routeMap[hashObj.route]);

      this.hashToData(routeForData, hashObj.id, hashObj.name, hashObj.params);
    }
  }

  hashToData(route, id, name, params) {
    let className,
      prop,
      options = {};
    className = route.route ? route.route.className : route.className;
    route.isSubRoute
      ? (className = route.route.className)
      : routeMap[route.hash].className;
    route.isSubRoute ? (prop = route.route) : (prop = routeMap[route.hash]);

    options = {
      className,
      prop,
      id,
      name,
      params
    };

    return this._fetchData(options);
  }

  _fetchData(options) {
    const property = options.hasSpotifyBackup
      ? options.prop.fetchSpotify
      : options.prop.fetch;
    return options.className[property](options.id, options.params).then(
      data => {
        if (data && !data.error) {
          if (options.params) {
            const params = options.params;
            return options.className[options.prop.dom](data, params);
          } else {
            return options.className[options.prop.dom](data);
          }
        }
        // if problem with fusion tables, use spotify as a backup
        else if (
          data &&
          data.error &&
          data.error.code === 400 &&
          options.className.hasBackup()
        ) {
          options.hasSpotifyBackup = true;
          this._fetchData(options);
        }
        //reloads in case of auth error to get user back into auth flow
        else if (data && data.error && data.error.status === 401) {
          window.location.reload();
          sessionStorage.clear();
        } else {
          return "There was an error processing your request. Please try again.";
          window.location.reload();
        }
      }
    );
  }

  _checkSubRoute(route, hash) {
    const subRoute = route["subRoutes"].filter(sroute => {
      return hash.indexOf(sroute.hash) > -1;
    });

    if (subRoute.length > 0) {
      return { route: subRoute[0], hash: subRoute[0].hash, isSubRoute: true };
    }
    return { route: route, hash: route.hash, isSubRoute: false };
  }

  _createHashArgs(hash) {
    let hashArr, route, id, name, params;

    (hashArr = hash.split("/") || hash.split("_")), (route = hashArr[0]);
    id = hashArr[1];
    name =
      hashArr[2] &&
      hashArr[2].indexOf(":") === -1 &&
      hashArr[2].indexOf("=") === -1
        ? hashArr[2]
        : "";
    params =
      (hashArr[2] && hashArr[2].indexOf(":") > -1) ||
      hashArr[2].indexOf("=") > -1
        ? hashArr[2]
        : hashArr[3];

    return { id, route, name, params };
  }
}

export default Router;
