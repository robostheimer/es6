'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';
import { each } from '../helpers/each-template';
import { iff } from '../helpers/if-template';
import { memoizeJSON, memoized } from '../helpers/memoize';


const auth_header =  new Headers({
  'Authorization': `Bearer ${sessionStorage.access_token}`
})

const post_header = new Headers({
  'Content-Type': 'application/json'
})

export default class SavedPlaylistButton {
  //TODO: memoize this method; see javascript ninja book
  fetchSpotifyProfile(name, tracks) {
    const url = 'https://api.spotify.com/v1/me'

    return fetch(url, {
      method: 'GET',
      headers: auth_header
      })
      .then((response) => {
        return response.json();
      })
      .then(function(data){
        const username = data.id
        const user_url = `https://api.spotify.com/v1/users/${username}/playlists`;
        fetch(user_url, {
            headers: auth_header,
            method: 'POST',
            body: JSON.stringify({
              name: `${name} from ES6 app`,
              public: false
            })
          })
          .then((json) => {
            return json.json();
        })
        .then((json) => {
          const playlist_url = `${user_url}/${json.id}/tracks?position=0&uris=${tracks}`;
          return fetch(playlist_url, {
            method: 'POST',
            headers: auth_header,
          })
        })
      })
  }

  createSpotifyPlaylist(id) {
    const url = 'https://api.spotify.com/v1/me'

    const data = memoizeJSON({ key: id,
      fn() {
        return fetch(url, {
          headers: auth_header
        });
      }
    });
    console.log(data);
    return data;
  }

  createSaveButtonDOM(data, type) {
    const tracks = [];
    const typeMap = {
      topSongs: `Top Songs by ${data[0].artists[0].name}`,
      radio: `Songs inspired by ${data[0].artists[0].name}`
    }

    data.forEach((track) => {
      tracks.push(`spotify%3Atrack%3A${track.id}`);
    });

    const buttonDOM = escapeTemplate`
      <button id="${tracks.toString()}" >
        Save Playlist
      </button>
    `;

    createDOM({ html: buttonDOM, tag: 'container' });

    //adds click event to button;
    document.getElementById(tracks.toString()).addEventListener('click', (event) => {
      if(event.preventDefault) {
        event.preventDefault();
      }

      this.fetchSpotifyProfile(typeMap[type], event.target.id);
    });
  }
}
