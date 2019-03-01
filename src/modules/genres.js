"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { router } from "../app";
import { action } from "../helpers/action";
import { each } from "../helpers/each-template";
import { genreIcons } from "../icons/genre-icons";

export default class Navigation {
  getHash() {
    return router.getHash();
  }

  setHash(str) {
    router.setHash(str);
  }

  getCity() {
    const hash = this.getHash();
    let city = hash.split("/")[2];
    if (city === "" || undefined) {
      city = sessionStorage.hash.split("/")[2];
    }
    return city;
  }

  getParams() {
    const hash = this.getHash();
    let params = hash.split("/");

    if (params === "" || undefined) {
      params = sessionStorage.hash.split("/");
    }

    return params[params.length - 1].indexOf("=") > -1 ||
      params[params.length - 1].indexOf(":") > -1
      ? params[params.length - 1]
      : undefined;
  }

  setHashedActiveGenres() {
    const hash = router.getHash().replace("_", "");
    const hashedGenres = hash.split("genres=");
    if (hashedGenres.length) {
      hashedGenres.forEach(hG => {
        genreIcons.forEach(genre => {
          //if (hashedGenres.indexOf(genre.genre.name.toLowerCase()) > -1) {
          if (genre.genre.similarGenres.indexOf(decodeURIComponent(hG)) > -1) {
            genre.genre.checkedState = "checked";
            genre.genre.state = "on";
          }
        });
      });
    }
  }

  getActiveGenres() {
    return genreIcons.filter(icon => icon.genre.state === "on");
  }

  createGenresDOM() {
    this.setHashedActiveGenres();
    const genresDOM = escapeTemplate`
      <div
      id="genre_holder">
      <ul class="genre_ul">
        ${each({
          data: genreIcons,
          tag: "li",
          txt: `
            <div class="checkbox {{genre.state}}" id="{{genre.genre}}">
              <input {{genre.checkedState}} type="checkbox" class="check" >
                <label for="{{genre.genre.replace(' ', '_')}}">
                  <div class="{{genre.genre}}"></div>
                  <div class="genre_text">{{genre.name}}</div>
                </label>
              </input>
            </div>`
        })}
      </ul>
    </div>`;
    createDOM({ html: genresDOM, tag: "#genres", clear: true });

    genreIcons.forEach(item => {
      action({
        fn: this.changeGenreState,
        tag: `#${item.genre.genre}`,
        params: { item, activeGenres: this.getActiveGenres() }
      });
    });
  }

  changeGenreState(options) {
    const checkbox = options.item;
    const icons = genreIcons;

    let nodes = document.querySelectorAll(".checkbox");

    nodes.forEach((item, index) => {
      if (checkbox.genre.genre === item.getAttribute("id")) {
        let classes = item.getAttribute("class");
        let classesArr = classes.split(" ") || [];

        let toggledClasses = [];
        const isOn = classes.indexOf("on") > -1;

        if (icons[index].genre.genre === checkbox.genre.genre) {
          let input = item.querySelector("input");
          if (isOn) {
            checkbox.genre.checkedState = "";
            checkbox.genre.state = "off";
            router.setHash(removeFromHash(checkbox));
            toggledClasses = classesArr.filter(
              item => item.indexOf("on") === -1
            );
            input.checked = false;
          } else {
            checkbox.genre.checkedState = "checked";
            checkbox.genre.state = "on";
            router.setHash(addToHash(checkbox));
            classesArr.push(checkbox.genre.state);
            toggledClasses = classesArr.filter(
              item => item.indexOf("off") === -1
            );
            input.checked = true;
          }

          classes = toggledClasses.join(" ");
          item.setAttribute("class", classes);
        }
      }
    });
  }
}

// Helper function to rebuild url after genre has been added
function addToHash(checkbox) {
  const hash = router.getHash();
  const similarGenresSplitter = checkbox.genre.similarGenres.split(",");
  const similarGenres = similarGenresSplitter
    .map((genre, index) => {
      return similarGenresSplitter.length - 1 > index
        ? `genres=${genre}_`
        : `genres=${genre}`;
    })
    .join("");
  const newHash =
    hash.indexOf("genres") > -1
      ? `${hash}_${similarGenres}`
      : hash + similarGenres;
  return newHash;
}

// Helper function to rebuild url after a genre has been removed
function removeFromHash(checkbox) {
  const hash = router.getHash();
  const hashSplitter = hash.split("genres=").map(item => item.replace("_", ""));
  const similarGenresSplitter = checkbox.genre.similarGenres.split(",");
  const currentGenres = hashSplitter.filter(genre => {
    // seems hacky to rely on hash here?
    return similarGenresSplitter.indexOf(decodeURIComponent(genre)) === -1;
  });
  const newHash =
    hashSplitter[0] +
    currentGenres
      .map((item, index) => {
        if (index > 0) {
          return currentGenres.length - 1 > index
            ? `genres=${item}_`
            : `genres=${item}`;
        }
      })
      .join("");
  return newHash;
}
