'use strict'

import Artist from './modules/artist';
import ArtistForm from './modules/artist-form';
import Router from 'router'


const artist = new Artist();
const form = new ArtistForm();
const router = new Router();

export  default function init() {
  form.createArtistFormDom('click');


  // artist.fetchArtists().then((data) => {
  //   artist.createArtistDom(data.artists, 'click');
  // });
}


$(document).ready(init);
