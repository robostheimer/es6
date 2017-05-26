'use strict'

//import $ from '../../node_modules/jquery/dist/jquery.min';
import { createDOM, escapeTemplate, addAjaxAction } from '../helpers/create-dom';
import Router from '../router';

const router = new Router();

export default class ArtistForm {
  createArtistFormDom() {
    const formDom = escapeTemplate`
      <form id="search">
        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>
      </form>
    `;

    createDOM({ html: formDom, tag: 'body'});

    const linkDom = escapeTemplate`
      <button id="search">
        Search
      </button>
    `;

    createDOM({ html: linkDom, tag: 'search'});
    //adds click event to button;

    //This seems to only be available for one time.  Why?
    document.getElementById('search').addEventListener('click', (event) => {
      if(event.preventDefault) {
        debugger;
        event.preventDefault();
      }
      this._makeHash();
    });

    //adds onEnter to the input
    // document.getElementById('find-artist').addEventListener('keypress', (event) => {
    //   if(event.keyCode === 13) {
    //     event.preventDefault();
    //     this._makeHash()
    //   }
    // });
  }

  _makeHash() {
    const val = document.getElementById('find-artist').value;

    router.makeHash('artist', val);
  }
}
