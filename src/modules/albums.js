"use strict";
import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { createArrayFromFusionData, each } from "../helpers/each-template";
import { memoizeJSON } from "../helpers/memoize";
import { addToStorage } from "../helpers/add-to-storage";
import CreatePlaylist from "./create-playlist";
const SCOPE = "playlist-modify-private playlist-modify-public";
const CLIENT_ID = "6e385b2a58fa42f6832a3a0bc3152c23";
const auth_header = new Headers({
    Authorization: `Bearer ${sessionStorage.access_token}`
});
const createPlaylist = new CreatePlaylist();
//TODO: Some problems with memoization -- NEED TO FIX
export default class Album {
    hasBackup() {
        return true;
    }
    fetchAlbum(id, name) {
        const baseUrl = "https://api.musicwhereyour.com";
        const route = "albumsMultiple/and~albums.id:";
        const url = `${baseUrl}/${route}${id}`;
        //const url = `https://api.spotify.com/v1/albums/${id}/tracks`;
        if (id) {
            var data = memoizeJSON({
                key: `album_${id}`,
                fn() {
                    return fetch(url);
                }
            });
            if (name) {
                addToStorage("hash", `/album_${id}`);
            }
            else {
                window.location.hash = `#/${sessionStorage.hash}`; // TODO: funnel this through the Router
            }
            return data;
        }
    }
    fetchAllAlbums(artist_id) {
        // const baseUrl =
        //   "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT";
        // const selectedCols = "*";
        // const matchType = "CONTAINS IGNORING CASE";
        // const sortBy = "";
        // const fusionId = "1rKOhgBT3w70yHl2eR4hc66Zxxyw06CK3ZlPolNie"; //e;
        // const key = "AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
        // const where = "Sid";
        // const whereQuery = artist_id;
        // const options = {
        //   baseUrl,
        //   fusionId,
        //   selectedCols,
        //   key,
        //   matchType,
        //   sortBy,
        //   where,
        //   whereQuery
        // };
        // const url = buildFusionUrl(options);
        const baseUrl = "https://api.musicwhereyour.com";
        const route = "albumsMultiple/and~Sid:";
        const url = `${baseUrl}/${route}${artist_id}`;
        if (artist_id) {
            var data = memoizeJSON({
                key: `albums_${artist_id}`,
                fn() {
                    return fetch(url);
                }
            });
            addToStorage("hash", `/albums/${artist_id}/`);
            return data;
        }
    }
    fetchAllAlbumsSpotify(artist_id, name) {
        const url = `https://api.spotify.com/v1/artists/${artist_id}/albums`;
        if (artist_id) {
            var data = memoizeJSON({
                key: `albums_${artist_id}`,
                fn() {
                    return fetch(url, {
                        headers: auth_header
                    });
                }
            });
            addToStorage("hash", `/albums/${artist_id}`);
            return data;
        }
    }
    createAlbumDOM(data) {
        const dom = escapeTemplate `
      <h2>Tracklist for ${data.albums[0].name} by ${data.Name}</h2>
      <ul id="top-tracks">
        ${each({
            data: data.albums,
            tag: "li",
            txt: `<div>
                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
                </div>
                `,
            attrs: {
                class: "track",
                title: null,
                id: null
            }
        })}
      </ul>
      `;
        // createPlaylist.createSaveButtonDOM(
        //   data.albums,
        //   "songsFromAlbum",
        //   data.name
        // );
        createDOM({ html: dom, tag: "#container", clear: true });
    }
    createAlbumsDOM(data, name) {
        let resolvedData;
        if (data.data) {
            //fusion table data
            resolvedData = createArrayFromFusionData(data.data, "albums", 30);
        }
        else if (data.spotify) {
            //spotify data
            resolvedData = data.spotify;
        }
        else {
            resolvedData = data.albums;
        }
        const dom = escapeTemplate `
    <h2>Albums by: ${data.Name}</h2>
      <ul id="top-tracks" class="cards">
        ${each({
            data: resolvedData,
            tag: "li",
            txt: `<div>
                  <strong><a href="#/album/{{id}}/{{name}}">{{name}}</a></strong>
                </div>
                `,
            attrs: {
                class: "artist",
                title: null,
                id: null,
                style: "background-image:url({{images[0].url}})"
            }
        })}
      </ul>
      `;
        createDOM({ html: dom, tag: "#container", clear: true });
    }
}
