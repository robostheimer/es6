"use strict";
import relatedArtists from "./related-artists";
import CreatePlaylist from "./create-playlist";
import { clearDOM, createDOM, escapeTemplate } from "../helpers/create-dom";
import { createArrayFromFusionData, each } from "../helpers/each-template";
import { memoizeJSON } from "../helpers/memoize";
import { addToStorage } from "../helpers/add-to-storage";
import { baseUrl } from "../app";
const related = new relatedArtists();
const createPlaylist = new CreatePlaylist();
const auth_header = new Headers({
    Authorization: `Bearer ${sessionStorage.access_token}`
});
export default class Artist {
    hasBackup() {
        return true;
    }
    fetchArtists(name) {
        const route = "artistsMatch";
        const url = `${baseUrl}/${route}/${name}`;
        if (name) {
            const data = memoizeJSON({
                key: name,
                fn() {
                    return fetch(url);
                }
            });
            addToStorage("hash", `/artist/${name}`);
            return data;
        }
    }
    fetchArtistsSpotify(name) {
        const url = `https://api.spotify.com/v1/search?q=${name}&type=artist`;
        if (name) {
            const data = memoizeJSON({
                key: name,
                fn() {
                    return fetch(url, {
                        headers: auth_header
                    });
                }
            });
            addToStorage("hash", `/artist/${name}`);
            return data;
        }
    }
    fetchTopTracks(id) {
        const route = "topTracksMultiple/and~Sid:";
        const url = `${baseUrl}/${route}${id}`;
        if (id) {
            var data = memoizeJSON({
                key: `top_${id}`,
                fn() {
                    return fetch(url);
                }
            });
            addToStorage("hash", `/top/${id}`);
            return data;
        }
    }
    fetchTopTracksSpotify(id) {
        const request = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;
        if (id) {
            var data = memoizeJSON({
                key: `top_${id}`,
                fn() {
                    return fetch(request, {
                        headers: auth_header
                    });
                }
            });
            addToStorage("hash", `/top/${id}/${name}`);
            return data;
        }
    }
    fetchRecommendations(id) {
        const request = `https://api.spotify.com/v1/recommendations?seed_artists=${id}&limit=50`;
        if (id) {
            var data = memoizeJSON({
                key: `recs_${id}`,
                fn() {
                    return fetch(request, {
                        headers: auth_header
                    });
                }
            });
            addToStorage("hash", `/recommendations/${id}`);
            return data;
        }
    }
    //TODO: Try to think about how to abstract this to use for all situations of creating dom
    //perhaps a recursive function of
    createArtistDom(data) {
        //, params) {
        clearDOM(".artist-modal");
        let resolvedData;
        if (data.data) {
            //fusion table data
            resolvedData = data.data;
        }
        else if (data.spotify) {
            //spotify data
            resolvedData = data.spotify;
        }
        else {
            resolvedData = data;
        }
        //$('#artists').remove();
        //const action = params.action;
        const dom = escapeTemplate `
      <ul id="artists" class="cards">
        ${each({
            data: resolvedData,
            tag: "li",
            txt: `<div>
                  <h4><a href="#/artist/info/{{Name}}">{{Name}}</a></h4>
                </div>
                <ul class="options">
                  <li>
                    <a href="#/related/{{Sid}}/">
                      Related Musicians
                    </a>
                  </li>
                  <li>
                    <a href="#/top/{{Sid}}">
                      Top Tracks
                    </a>
                  </li>
                  <li>
                    <a href="#/albums/{{Sid}}/{{Name}}">
                      Albums
                    </a>
                  </li>
                  <li>
                    <a href="#/recommendations/{{Sid}}">
                      Create Radio Station
                    </a>
                  <li>
                  <li>
                    <a href="#/city/{{City}}/artists">
                      Other musicians from {{City}}
                    </a>
                  </li>
                  <li>
                    <a href="#/city/{{City}}/tracks/genres=">

                      Hottest Tracks from {{City}}
                    </a>
                  </li>
                </ul>
                `,
            attrs: {
                class: "artist",
                title: null,
                id: null,
                style: "background-image:url({{spotify.images[0.url}})"
            }
        })}
      </ul>
    `;
        createDOM({ html: dom, tag: "#container", clear: true });
    }
    createTopTracksDOM(data, name) {
        let resolvedData;
        if (data.data) {
            //fusion table data
            resolvedData = createArrayFromFusionData(data.data, "topTracks", 20);
        }
        else {
            //spotify data
            resolvedData = data[0].topTracks;
        }
        const dom = escapeTemplate `
      <h2>Top Tracks for ${data.Name}</h2>
      <ul id="top-tracks" class="cards">
        ${each({
            data: resolvedData,
            tag: "li",
            txt: `<div>
                  <strong><a href="{{id}}" target="_blank">{{name}}</a></strong>
                </div>
                <p>
                  from: <a href="#/album/{{album.id}}/{{album.name}}">{{album.name}}</a>
                </p>
                `,
            attrs: {
                class: "artist card",
                title: null,
                id: null,
                style: "background-image:url({{album.images[0].url}})"
            }
        })}
      </ul>
      `;
        // Need to update create playlist functionality to play nice with new data structure
        //createPlaylist.createSaveButtonDOM(normalizedData, 'topSongs');
        createDOM({ html: dom, tag: "#container", clear: true });
    }
    createRecsDOM(data) {
        const dom = escapeTemplate `
    <h2>Playlist Inspired by: ${data.tracks[0].artists[0].name}</h2>
      <ul id="radio" class="cards">
        ${each({
            data: data.tracks,
            tag: "li",
            txt: `<div>
                  <strong><a href="{{external_urls.spotify}}" target="_blank">{{name}}</a></strong>
                </div>
                <p>
                  Album: <a href="#/album/{{album.id}}/{{album.name}}">{{album.name}}</a>
                </p>
                <p>By: <a href="#/artist/{{artists[0].name}}">{{artists[0].name}}</a>
                `,
            attrs: {
                class: "playlist card",
                title: null,
                id: null,
                style: "background-image:url({{album.images[0].url}})"
            }
        })}
      </ul>
      `;
        createPlaylist.createSaveButtonDOM(data.tracks, "radio", []);
        createDOM({ html: dom, tag: "#container", clear: true });
    }
}
