'use strict'

import Artist from './modules/artist';
import ArtistForm from './modules/artist-form';
import Router from './router';


const artist = new Artist();
const form = new ArtistForm();
const router = new Router();

export  default function init() {
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

  document.getElementById('search').addEventListener('click', (event) => {
    if(event.preventDefault) {
      debugger;
      event.preventDefault();
    }
    _makeHash();
  });

  //adds onEnter to the input
  // document.getElementById('find-artist').addEventListener('keypress', (event) => {
  //   if(event.keyCode === 13) {
  //     event.preventDefault();
  //     this._makeHash()
  //   }
  // });

  function _makeHash() {
    const val = document.getElementById('find-artist').value;

    router.makeHash('artist', val);
  }
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
