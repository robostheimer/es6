'use strict'

import Artist from './modules/artist';
import ArtistForm from './modules/artist-form';
import Router from './router';


const artist = new Artist();
const form = new ArtistForm();
const router = new Router();

export  default function init() {
  form.createArtistFormDom('click');
  router.logHash();
  let hash = window.location.hash.replace('#', ''),
    args = createHashArgs(hash);


  router.makeHash(args.route, args.id);

  $(window).on('hashchange', function() {
    let hash = window.location.hash.replace('#', ''),
      args = createHashArgs(hash);

    router.makeHash(args.route, args.id);
  });
}

function createHashArgs(hash) {
  let hashArr,
    route,
    id;

    if(!hash) {
      id = 'wilco';
      route ='artist';
    } else {
      hashArr = hash.split('_')
      route = hashArr[0];
      id = hashArr[1];
    }
    return {id: id, route: route}
}


$(document).ready(init);
