"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { router } from "../app";
import { action } from "../helpers/action";
import { each } from "../helpers/each-template";
import { genreIcons } from "../icons/genre-icons";
import { genres } from "../helpers/genres";

export default class Navigation {
  _getHash() {
    return router.getHash();
  }

  _setHash(str) {
    router.setHash(str);
  }

  _setHashedActiveGenres() {
    const hash = this._getHash().replace("_", "");
    const hashedGenres = hash.split("genres=");
    if (hashedGenres.length) {
      hashedGenres.forEach(hG => {
        genreIcons.forEach(genre => {
          //if (hashedGenres.indexOf(genre.genre.name.toLowerCase()) > -1) {
          //if (genre.genre.similarGenres.indexOf(decodeURIComponent(hG).slice(0, hg.length-1)) > -1) {
          if (genre.genre.name.toLowerCase() === decodeURIComponent(hG)) {
            genre.genre.checkedState = "checked";
            genre.genre.state = "on";
          }
        });
      });
    }
  }

  _getActiveGenres() {
    return genreIcons.filter(icon => icon.genre.state === "on");
  }

  createGenresDOM() {
    this._setHashedActiveGenres();
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
        fn: this._changeGenreState,
        tag: `#${item.genre.genre}`,
        params: { item, activeGenres: this._getActiveGenres() }
      });
    });
  }

  clearGenres() {
    genreIcons.forEach(genre => {
      (genre.genre.isSelected = false),
        (genre.genre.state = "off"),
        (genre.genre.checkedState = "");
    });
  }

  _changeGenreState(options) {
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
    return (
      similarGenresSplitter.indexOf(
        decodeURIComponent(genre).replace("/", "")
      ) === -1
    );
  });
  checkbox.genre.checkedState = "";
  checkbox.genre.isSelected = false;
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
