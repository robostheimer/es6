"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { router } from "../app";
import { action } from "../helpers/action";
import { each } from "../helpers/each-template";
import { iff } from "../helpers/if-template";

export default class Navigation {
  _getHash() {
    return router.getHash();
  }
  _getCity() {
    const hash = this._getHash();
    let city = hash.split("/")[2];
    if (city === "" || undefined) {
      city = sessionStorage.hash.split("/")[2];
    }
    return city;
  }

  _getParams() {
    let hash = this._getHash();
    // this is extremely hacky need to revisit
    if (hash && hash.length && hash[hash.length - 1] === "/") {
      hash = hash.slice(0, hash.length - 1);
    }
    let params = hash.split("/");
    if (params === "" || undefined) {
      params = sessionStorage.hash.split("/");
    }
    const paramsColon =
      params[params.length - 1].indexOf(":") > -1
        ? params[params.length - 1]
        : undefined;
    const paramsEqual =
      params[params.length - 1].indexOf("=") > -1
        ? params[params.length - 1]
        : undefined;
    return paramsColon || paramsEqual;
  }

  _getIcons() {
    const city = this._getCity();
    const params = this._getParams();
    const hash = this._getHash();
    return [
      {
        icon: "map",
        type: "link",
        txt: `<a href="${iff(
          params,
          `#/city/${city}/${params}`,
          `#/city/${city}/`
        )}">
          <div class="open_div">
            <span
              class="${iff(
                hash.indexOf("city") > -1 && hash.indexOf("tracks") === -1,
                "icon iconmap nav-icon active",
                "icon iconmap nav-icon"
              )}"></span>
          </div>
              </a >`
      },
      {
        icon: "song",
        type: "link",
        txt: `<a href="${iff(
          this._getParams(),
          `#/city/${city}/tracks/${params}/`,
          `#/city/${city}/tracks/`
        )}">
          <div class="open_div">
            <span
              class="${iff(
                hash.indexOf("tracks") > -1,
                "icon iconsong nav-icon active",
                "icon iconsong nav-icon"
              )}"></span>
          </div>
              </a >`
      },
      {
        icon: "genres",
        type: "button",
        txt: `<button class= "open_div" >
            <span
            class="icon iconequalizer12 nav-icon"></span>
              </button >`
      },
      {
        icon: "star",
        type: "link",
        txt: `<a href="#/favorites/" >
          <div class="open_div">
            <span
              class="${iff(
                hash.indexOf("favorites") > -1,
                "icon iconfavorite nav-icon active",
                "icon iconfavorite nav-icon"
              )}"></span>
          </div>
              </a >`
      },
      {
        icon: "information",
        type: "button",
        txt: `<button class="open_div">
          <span
            class="icon iconinfo nav-icon"></span>
        </button>`
      }
    ];
  }

  createNavigationDOM() {
    const icons = this._getIcons();
    const navigationDOM = escapeTemplate`
      <nav
      class="navigation_holder">
      <ul class="nav_ul">
        ${each({
          data: icons,
          tag: "li",
          attrs: { class: `{{icon}}` },
          txt: `{{txt}}`
        })}
      </ul>
    </nav>`;
    createDOM({ html: navigationDOM, tag: "#nav", clear: true });

    this._changeNavState({ icons });

    icons.forEach(item => {
      action({
        fn: this._changeNavState,
        tag: `.${item.icon}`,
        params: {
          type: item.icon,
          icons,
          isGenre: item.icon === "genres"
        }
      });
    });
  }

  _changeNavState(options) {
    const icons = options.icons;
    const type = options.type;
    const isGenre = options.isGenre;
    let nodes = document.querySelectorAll(".nav-icon");

    nodes.forEach((item, index) => {
      let classes = item.getAttribute("class");
      const isActive = classes.indexOf("active") > -1;

      if (icons[index].icon === type) {
        if (isActive) {
          item.classList.remove("active");
        } else {
          item.classList.add("active");
        }
      }
    });

    // hacky way to get genres to work.  Revisit
    const genreDOM = document.querySelector("#genres");
    const genreButton = document.querySelector(".open_div .iconequalizer12 ");

    if (isGenre) {
      if (
        genreDOM.classList.contains("hide") &&
        genreButton.classList.contains("active")
      ) {
        genreDOM.classList.remove("hide");
      } else {
        genreDOM.classList.add("hide");
        genreButton.classList.remove("active");
      }
    } else if (!genreDOM.classList.contains("hide")) {
      genreButton.classList.add("active");
    }
  }
}
