"use strict";

import Router from "./router";
import Artist from "./modules/artist";
import ArtistForm from "./modules/artist-form";
import Geolocation from "./modules/geolocation";
import { addToStorage } from "./helpers/add-to-storage";

const artist = new Artist();
const form = new ArtistForm();
const router = new Router();
const geolocation = new Geolocation();
const client_id = "1b7c83fc02404e08892183b94c0986a9";
const scope = "playlist-modify-private playlist-modify-public";

export default function init() {
  //checks for Spotify Authorization
  if (
    router.getHash().split("=")[0] === "#access_token" &&
    !sessionStorage.access_token
  ) {
    sessionStorage.setItem("access_token", router.getHash().split("=")[1]);
    router.setHash(sessionStorage.hash);
    window.location.reload();
  } else if (!sessionStorage.access_token) {
    sessionStorage.setItem("hash", router.getHash());
    let http;

    if (window.location.hostname === "localhost") {
      http = "https://localhost:8082/index.html";
    } else {
      http = "https://d2v5wkcovtgl6u.cloudfront.net";
    }

    const authorization_url = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${http}`;

    window.open(authorization_url, "_self");
  } else {
    if (sessionStorage.hash && sessionStorage.hash.indexOf("/") === 0) {
    } else {
      sessionStorage.setItem("hash", `/${sessionStorage.hash}`);
    }
    router.setHash(sessionStorage.hash);
    startApp();
  }
}

function startApp() {
  const withGeolocationAsked =
    !sessionStorage.getItem("geolocationAsked") ||
    sessionStorage.getItem("geolocationAsked") === "false";

  if (withGeolocationAsked) {
    promptGeolocationModal();
  }

  const hash = router.getHash();

  if (hash) {
    router.getParamsFromHash(hash);
  }

  $(window).on("hashchange", function(e) {
    const hash = router.getHash();

    if (hash) {
      router.getParamsFromHash(hash);
    }
  });
  form.createArtistFormDom();
}

function promptGeolocationModal() {
  sessionStorage.setItem("geolocationAsked", true);

  return geolocation.getGeolocation().then(options => {
    return geolocation.buildMap(options);
  });
}

$(document).ready(init);
