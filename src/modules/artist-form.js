'use strict'

//import $ from '../../node_modules/jquery/dist/jquery.min';
import { createDOM, escapeTemplate, addAjaxAction } from '../helpers/create-dom';
import { addToStorage } from '../helpers/add-to-storage';
import Router from '../router';

const router = new Router();

export default class ArtistForm {
  createArtistFormDom() {
    const formDom = escapeTemplate`
      <form id="search">
        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>
      </form>
      <div id="spotify-player"></div>
    `;

    createDOM({ html: formDom, tag: 'body' });

    const buttonDOM = escapeTemplate`
      <button id="search_artists">
        Search
      </button>
    `;

    createDOM({ html: buttonDOM, tag: 'search' });

    const containerDOM = escapeTemplate `
      <section id="container"></section>
    `

    createDOM({ html: containerDOM, tag: 'body' });

    // const playerContainerDOM = escapeTemplate `
    //   <section id="player-container"></section>
    // `
    //
    // createDOM({ html: playerContainerDOM, tag: 'body' });

    //adds click event to button;
    document.getElementById('search_artists').addEventListener('click', (event) => {
      if(event.preventDefault) {
        event.preventDefault();
      }
      this._makeHash();
    });

    //adds onEnter to the input
    document.getElementById('find-artist').addEventListener('keypress', (event) => {
      if(event.keyCode === 13) {
        event.preventDefault();
        this._makeHash()
      }
    });
  }

  _makeHash() {
    const val = document.getElementById('find-artist').value;

    router.makeHash({ route: 'artist', id: val });
    addToStorage('hash', `/artist/${val}`)
  }
}
