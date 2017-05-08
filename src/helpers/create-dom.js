'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';
import each from './each-template';

// Accepts tag and html (template literal string) options and appends them to the DOM
export  function createDOM(options) {
  const tag = options.tag === 'body' ? options.tag : `#${options.tag}`;
  const html = options.html;
  const clearElement = options.clearElement
  $(tag).children().html('');
  //TODO:create a each/loop helper and import
  $(tag).append(html);
  }

// Pattern that adds ajax actions to dom elements that are attached to specific classes
// Typical use case would be to ceate a component and then add an ajax action to that component
// If ajax action requires the DOM to change that the methods array should contain more than one
// the second of which would create the dom
// @param options {object}
//  options.id: {String} id attr of the DOM node that has the ajax action added to it
//  options.action: {String} that represents the action to be added (i.e. 'click')
//  options.addDOM: {Boolean} flag that tells method if DOM should be added
//  options.type: {Class} the parent class that provides the ajax action
//  options.methods {Array} array of strings that are the methods to be called from the Class

export function addAjaxAction(options) {
  const id = options.id;
  const action = options.action;
  const addDom = true;
  const type = options.type;
  const methods = options.methods;
  console.log($(id)[action]());

  document.getElementById(id).addEventListener(action, (e) => {
    const id = e.target.id;

    if(methods && type) {
      type[methods[0]](id).then((data) => {
        if (addDom && methods[1]) {
          type[methods[1]](data.artists, id);
        }
      })
    }
  })
}
