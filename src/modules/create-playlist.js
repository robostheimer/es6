"use strict";
import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { memoizeJSON } from "../helpers/memoize";
import SpotifyPlayer from "./spotify-player";
const auth_header = new Headers({
    Authorization: `Bearer ${sessionStorage.access_token}`
});
const post_header = new Headers({
    "Content-Type": "application/json"
});
const player = new SpotifyPlayer();
export default class CreatePlaylist {
    //TODO: memoize this method; see javascript ninja book
    fetchSpotifyProfile(name, tracks) {
        const url = "https://api.spotify.com/v1/me";
        return fetch(url, {
            method: "GET",
            headers: auth_header
        })
            .then(response => {
            return response.json();
        })
            .then(function (data) {
            const username = data.id;
            const user_url = `https://api.spotify.com/v1/users/${username}/playlists`;
            fetch(user_url, {
                headers: auth_header,
                method: "POST",
                body: JSON.stringify({
                    name: `${name} from ES6 app`,
                    public: false
                })
            })
                .then(json => {
                return json.json();
            })
                .then(json => {
                const id = json.id;
                const playlist_url = `${user_url}/${id}/tracks?position=0&uris=${tracks}`;
                return fetch(playlist_url, {
                    method: "POST",
                    headers: auth_header
                }).then(() => {
                    //After playlist is created; create a music player and display it to user
                    player.createSpotifyPlayerDOM(id, username);
                });
            });
        });
    }
    createSpotifyPlaylist(id) {
        const url = "https://api.spotify.com/v1/me";
        const data = memoizeJSON({
            key: id,
            fn() {
                return fetch(url, {
                    headers: auth_header
                });
            }
        });
        return data;
    }
    createSaveButtonDOM(data, type, name) {
        const tracks = [];
        const typeMap = {
            topSongs: `Top Songs by ${data[0].artists[0].name}`,
            radio: `Songs inspired by ${data[0].artists[0].name}`,
            songsFromAlbum: `${name} by ${data[0].artists[0].name}`
        };
        data.forEach(track => {
            tracks.push(`spotify%3Atrack%3A${track.id}`);
        });
        const buttonDOM = escapeTemplate `
      <button id="${tracks.toString()}" >
        Save Playlist to your Spotify Account
      </button>
      <div>
        <em>Saving the playlist will add a spotify player to this app</em>
      </div>
    `;
        createDOM({ html: buttonDOM, tag: "#spotify-player", clear: true });
        //adds click event to button;
        document
            .getElementById(tracks.toString())
            .addEventListener("click", event => {
            if (event.preventDefault) {
                event.preventDefault();
            }
            // @ts-ignore
            this.fetchSpotifyProfile(typeMap[type], event.target.id);
            document
                .getElementById(tracks.toString())
                .setAttribute("disabled", "true");
        });
    }
}
