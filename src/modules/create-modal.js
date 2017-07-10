'use strict'

import { createDOM, escapeTemplate } from '../helpers/create-dom';

// creates a Modal Container that can be added to any route
export default class CreateModal {
  createModal(...args) {
    const modalDom = escapeTemplate
    `<section id="modalDom">
      <header>
        <h4>Info about ${args[0].title}</h4>
      </header>
      <div id="modal-container"></div>
    </section>`

    createDOM({ html: modalDom, tag: 'container' });
  }
}
