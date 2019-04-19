"use strict";

// Accepts tag and html (template literal string).  creates and returns a dom element
export function createDOM(options) {
  const html = options.html;
  const clear = options.clear;
  const selector = document.querySelector(options.tag)
    ? document.querySelector(options.tag)
    : document.getElementById(options.tag);

  //TODO Figure out a better way to deal with this; shouldn't have to remove DOM
  // should be dealt with on the class level; i.e. the class should be smart enough
  // to know whether to show this or not

  if (clear) {
    selector.innerHTML = "";
  }

  selector.innerHTML += html;

  return selector;
}

export function appendNode(options) {
  const node = options.node;
  const selector = options.selector;

  document.querySelector(selector).appendChild(node);
}

export function action(options) {
  const node = options.node;
  options.node.addEventListener(options.type, () => {
    options.fn(options.params);
  });
}

export function createHTMLNode(options) {
  const elm = document.createElement(options.tag);
  options.attrs.forEach(attr => {
    for (let key in attr) {
      elm.setAttribute(key, attr[key]);
    }
  });

  elm.innerHTML = options.html;

  return elm;
}

export function clearDOM(tag) {
  var elem = document.querySelector(tag);
  if (elem) {
    elem.parentNode.removeChild(elem);
  }
}

export function hasDOM(tag) {
  return document.querySelector(tag);
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
  const methods = options.methods; // includes method names and optional params object to be passed to the method
  const replace = options.replace;
  document.getElementById(id).addEventListener(action, e => {
    const targetId = _findId(e.target);

    const title = e.target.title;
    if (methods && type) {
      type[methods[0].method](targetId).then(data => {
        if (addDom && methods[1]) {
          if (data.artists.items) {
            data.artists = data.artists.items;
          }
          methods[1].params.id = targetId;
          methods[1].params.title = title;
          type[methods[1].method](data.artists, methods[1].params);
        }
      });
    }
  });
}

export function escapeTemplate(literalSections, ...substs) {
  // Use raw literal sections: we don’t want
  // backslashes (\n etc.) to be interpreted
  let raw = literalSections.raw;

  let result = "";

  substs.forEach((subst, i) => {
    // Retrieve the literal section preceding
    // the current substitution
    let lit = raw[i];

    // In the example, map() returns an array:
    // If substitution is an array (and not a string),
    // we turn it into a string
    if (Array.isArray(subst)) {
      subst = subst.join("");
    }

    // If the substitution is preceded by a dollar sign,
    // we escape special characters in it
    // if (lit.endsWith("$")) {
    //   subst = htmlEscape(subst);
    //   lit = lit.slice(0, -1);
    // }
    result += lit;
    result += subst;
  });
  // Take care of last literal section
  // (Never fails, because an empty template string
  // produces one literal section, an empty string)
  result += raw[raw.length - 1]; // (A)

  return result;
}

function _findId(target) {
  if (target.id) {
    return target.id;
  }
  return $(target.closest("[id]")).attr("id");
}
