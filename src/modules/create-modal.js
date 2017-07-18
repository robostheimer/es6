'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';

// creates a Modal Container that can be added to any route
export default class CreateModal {
  createModal(...args) {
    const modalDom = escapeTemplate
    `<section id="modal">
        <div class="modal-dialog" role="document">
          <header class="modal-header">
            <h4>Info about ${args[0].title}</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          </header>
          <div id="modal-container" class="modal-body"></div>
          <div class="modal-footer" style="display: none;"></div>
        </div>
    </section>`

    createDOM({ html: modalDom, tag: 'body' });

    //adds click event to close button;
    document.querySelector('.close').addEventListener('click', (event) => {
      window.history.back(); // should be added to router
    });
  }
}
