"use strict";

import Router from "./router";
import CityForm from "./modules/city-form";
import Map from "./modules/map";
import Navigation from "./modules/navigation";
import Genres from "./modules/genres";

const cityForm = new CityForm();
export const router = new Router();
export const map = new Map();
const navigation = new Navigation();
const genres = new Genres();

const client_id = "1b7c83fc02404e08892183b94c0986a9";
const scope = "playlist-modify-private playlist-modify-public";

export const baseUrl =
  router.getBaseUrl().indexOf("localhost") > -1
    ? "http://localhost:3000"
    : "https://api.musicwhereyour.com";

export default function init() {
  //checks for Spotify Authorization
  // if (
  //   router.getHash().split("=")[0] === "#access_token" &&
  //   !sessionStorage.access_token
  // ) {
  //   sessionStorage.setItem("access_token", router.getHash().split("=")[1]);
  //   router.setHash(sessionStorage.hash);
  //   window.location.reload();
  // } else if (!sessionStorage.access_token) {
  //   sessionStorage.setItem("hash", router.getHash());
  //   let http;

  //   if (window.location.hostname === "localhost") {
  //     http = "https://localhost:8082/index.html";
  //   } else {
  //     http = "https://d2v5wkcovtgl6u.cloudfront.net";
  //   }

  //   const authorization_url = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(
  //     scope
  //   )}&redirect_uri=${http}`;

  //   window.open(authorization_url, "_self");
  // } else {
  //   if (sessionStorage.hash && sessionStorage.hash.indexOf("/") === 0) {
  //   } else {
  //     sessionStorage.setItem("hash", `/${sessionStorage.hash}`);
  //   }
  //router.setHash(sessionStorage.hash || "");
  startApp();
  //}
}

function startApp() {
  let hash = router.getHash() || "map";
  router.setHash(hash);
  router.getParamsFromHash(hash);

  $(window).on("hashchange", function(e) {
    if (hash) {
      hash = router.getHash();
      navigation.createNavigationDOM();
      genres.createGenresDOM();
      router.getParamsFromHash(hash);
    }
  });
  cityForm.createCityFormDom();
  navigation.createNavigationDOM();
  genres.createGenresDOM();
}

$(document).ready(init);
