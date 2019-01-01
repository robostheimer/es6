"use strict";

import { createDOM, escapeTemplate } from "../helpers/create-dom";
import { router } from "../app";
import { onClick } from "../helpers/on-click";
import { each } from "../helpers/each-template";
import { iff } from "../helpers/if-template";

export default class Navigation {
  getHash() {
    return router.getHash();
  }
  getCity() {
    const hash = this.getHash();
    return hash.split("/")[2]
  }

  getIcons() {
    const city = this.getCity();
    return [
      {
        icon: 'map',
        activeClass: 'active-ma',
        txt: `<a href="#/city/${city}/" >
          <div class="open_div">
            <span
              class="${iff(this.getHash().indexOf('tracks') > -1, "icon iconmap nav-icon active-ma", "icon iconmap nav-icon")}></span>
          </div>
              </a >`
      },
      {
        icon: 'song',
        activeClass: 'active-pl',
        txt: `<a href="#/city/${city}/tracks" >
          <div class="open_div">
            <span
              class="${iff(this.getHash().indexOf('tracks') > -1, "icon iconsong nav-icon active-pl", "icon iconsong nav-icon")}"></span>
          </div>
              </a >`
      },
      {
        icon: 'genres',
        activeClass: 'active-ge',
        txt: `<button class= "open_div" >
            <span
            class="icon iconequalizer12 nav-icon"></span>
              </button >`
      },
      {
        icon: 'star',
        activeClass: 'active-fa',
        txt: `<a href="#/favorites" >
          <div class="open_div">
            <span
              class="icon iconfavorite nav-icon"></span>
          </div>
              </a >`
      },
      {
        icon: 'information',
        activeClass: 'active-in',
        txt: `<button class="open_div">
          <span
            class="icon iconinfo nav-icon"></span>
        </button>`
      }
    ]
  }
  

  createNavigationDOM() {
    const navigationDOM = escapeTemplate`
      <nav
      class="navigation_holder">
      <ul class="nav_ul">
        ${each({
          data: this.getIcons(),
          tag: "li",
          attrs: {class: `{{icon}}`},
          txt: `{{txt}}`
        })}
      </ul>
    </nav>`;
    createDOM({ html: navigationDOM, tag: "#nav", clear:true });

    this.changeNavState({icons: this.getIcons()});
    
    this.getIcons().forEach((item) => {
      onClick({
        fn: this.changeNavState,
        tag: `.${item.icon}`,
        params: { type: item.icon, icons: this.getIcons()},
      });
    })
   
  }

  changeNavState(options) {
    const icons = options.icons;
    const type = options.type
    let nodes = document.querySelectorAll('.nav-icon');
  
    // nodes.forEach((item,index) => {
    //   let classes = item.getAttribute('class');
    //   let classesArr = classes.split(' ');
    //   if(classes.indexOf('active') > -1) {
    //     const filteredClasses = classesArr.filter((item) => {
    //       return item.indexOf('active') === -1;
    //     })
    //     classes = filteredClasses.join(' ');
    //     item.setAttribute('class', classes);
    //   }
    //   if(icons[index].icon === options.type) {
    //     classesArr.push(icons[index].activeClass);
    //     classes = classesArr.join(' ');
    //     item.setAttribute('class', classes);
    //   }
    // });
  }
}
