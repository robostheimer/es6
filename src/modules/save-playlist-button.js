'use strict'

//import $ from '../../node_modules/jquery/dist/jquery.min';
import { createDOM, escapeTemplate, addAjaxAction } from '../helpers/create-dom';
import { addToStorage } from '../helpers/add-to-storage';
import Router from '../router';

const router = new Router();

export default class SpotifyPlayer {
  savePlaylist() {
    ///v1/users/{user_id}/playlists
  }

  addTracksToPlaylist() {
    ///v1/users/{user_id}/playlists/{playlist_id}/tracks
  }

}
