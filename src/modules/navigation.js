"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { router } from "../app";
import { action } from "../helpers/action";
import { each } from "../helpers/each-template";
import { iff } from "../helpers/if-template";

export default class Navigation {
  getHash() {
    return router.getHash();
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

  getIcons() {
    const city = this.getCity();
    const params = this.getParams();
    return [
      {
        icon: "map",
        type: "link",
        activeClass: "active-ma",
        txt: `<a href="${iff(
          this.getParams(),
          `#/city/${city}/${params}`,
          `#/city/${city}/`
        )}">
          <div class="open_div">
            <span
              class="${iff(
                this.getHash().indexOf("city") > -1 &&
                  this.getHash().indexOf("tracks") === -1,
                "icon iconmap nav-icon active-ma",
                "icon iconmap nav-icon"
              )}"></span>
          </div>
              </a >`
      },
      {
        icon: "song",
        type: "link",
        activeClass: "active-pl",
        txt: `<a href="${iff(
          this.getParams(),
          `#/city/${city}/tracks/${params}`,
          `#/city/${city}/tracks`
        )}">
          <div class="open_div">
            <span
              class="${iff(
                this.getHash().indexOf("tracks") > -1,
                "icon iconsong nav-icon active-pl",
                "icon iconsong nav-icon"
              )}"></span>
          </div>
              </a >`
      },
      {
        icon: "genres",
        type: "button",
        activeClass: "active-ge",
        txt: `<button class= "open_div" >
            <span
            class="icon iconequalizer12 nav-icon"></span>
              </button >`
      },
      {
        icon: "star",
        type: "link",
        activeClass: "active-fa",
        txt: `<a href="#/favorites/" >
          <div class="open_div">
            <span
              class="${iff(
                this.getHash().indexOf("favorites") > -1,
                "icon iconfavorite nav-icon active-fa",
                "icon iconfavorite nav-icon"
              )}"></span>
          </div>
              </a >`
      },
      {
        icon: "information",
        type: "button",
        activeClass: "active-in",
        txt: `<button class="open_div">
          <span
            class="icon iconinfo nav-icon"></span>
        </button>`
      }
    ];
  }

  createNavigationDOM() {
    const navigationDOM = escapeTemplate`
      <nav
      class="navigation_holder">
      <ul class="nav_ul">
        ${each({
          data: this.getIcons(),
          tag: "li",
          attrs: { class: `{{icon}}` },
          txt: `{{txt}}`
        })}
      </ul>
    </nav>`;
    createDOM({ html: navigationDOM, tag: "#nav", clear: true });

    this.changeNavState({ icons: this.getIcons() });

    this.getIcons().forEach(item => {
      action({
        fn: this.changeNavState,
        tag: `.${item.icon}`,
        params: { type: item.icon, icons: this.getIcons() }
      });
    });
  }

  changeNavState(options) {
    const icons = options.icons;
    const type = options.type;
    let nodes = document.querySelectorAll(".nav-icon");

    nodes.forEach((item, index) => {
      let classes = item.getAttribute("class");
      let classesArr = classes.split(" ") || [];
      let toggledClasses = [];
      const isActive = classes.indexOf("active") > -1;

      if (icons[index].icon === type) {
        if (isActive) {
          toggledClasses = classesArr.filter(item => {
            return item.indexOf("active") === -1;
          });
        } else {
          classesArr.push(icons[index].activeClass);
          toggledClasses = classesArr;
        }

        classes = toggledClasses.join(" ");
        item.setAttribute("class", classes);
      }
    });
  }
}
