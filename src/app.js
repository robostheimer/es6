'use strict'

import Artist from './modules/artist';
import ArtistForm from './modules/artist-form';
import Router from './router';

const artist = new Artist();
const form = new ArtistForm();
const router = new Router();
const client_id = '1b7c83fc02404e08892183b94c0986a9';
const scope = 'playlist-modify-private playlist-modify-public';

export  default function init() {
  //checks for Spotify Authorization
  if (window.location.hash.split('=')[0] === '#access_token' && !sessionStorage.access_token) {
    sessionStorage.setItem('access_token', window.location.hash.split('=')[1]);
    window.location.hash = sessionStorage.hash;
    window.location.reload();

  } else if(!sessionStorage.access_token) {
    sessionStorage.setItem('hash', window.location.hash);
    let http;

    if(window.location.hostname === 'localhost')
    {
      http = 'http://localhost:8082/index.html';
    } else {
      http = 'https://robostheimer.github.io/spotify-ember-app/'
    }

    const authorization_url = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${http}`;

    window.open(authorization_url, '_self');
  } else {
    window.location.hash = sessionStorage.hash;
    startApp();
  }
}

function startApp() {
  form.createArtistFormDom();

  router.logHash();
  let hash = window.location.hash.replace('#', ''),
    args = createHashArgs(hash);

  if(hash) {
    router.makeHash(args.route, args.id);
  }

  $(window).on('hashchange', function() {
    let hash = window.location.hash.replace('#', ''),
      args = createHashArgs(hash);
    if(hash) {
      router.makeHash(args.route, args.id);
    }
  });
}

function createHashArgs(hash) {
  let hashArr,
    route,
    id;

  hashArr = hash.split('_')
  route = hashArr[0];
  id = hashArr[1];

  return {id: id, route: route}
}


$(document).ready(init);
