"use strict";
import { createDOM, escapeTemplate, clearDOM } from "../helpers/create-dom";
// creates a Modal Container that can be added to any route
//TODO: add css to make this fade in to the dom
export default class ModalCreate {
    createModal(...args) {
        const modalDom = escapeTemplate `<section id="modal" class="artist-modal">
        <div class="modal-dialog" role="document">
          <header class="modal-header">
            <h4 id="modal-headline">
              ${args[0] ? args[0].title : ""}
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          </header>
          <div id="modal-container" class="modal-body"></div>
          <div class="modal-footer" id="modal-footer"></div>
        </div>
    </section>`;
        createDOM({ html: modalDom, tag: "body" });
        //adds click event to close button;
        document.querySelector(".close").addEventListener("click", () => {
            //addToStorage("hash", `/artist/${arguments[0].title}`);
            window.location.hash = sessionStorage.hash; // should be added to router
            clearDOM(".artist-modal");
        });
    }
    createButtons(...args) {
        const params = args[0];
        params.forEach(arg => {
            let dom = escapeTemplate `<button id="${arg.id}">
          <a href="#${arg.hash}">${arg.value}</a>
        </button>
       `;
            createDOM({ html: dom, tag: "modal-footer" });
        });
        document.getElementById("no").addEventListener("click", () => {
            clearDOM(".artist-modal");
        });
        document.getElementById("yes").addEventListener("click", () => {
            clearDOM(".artist-modal");
        });
    }
}
