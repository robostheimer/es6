"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _templateObject = _taggedTemplateLiteral(
    [
      '\n      <form id="search">\n        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>\n      </form>\n      <div id="spotify-player"></div>\n    '
    ],
    [
      '\n      <form id="search">\n        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>\n      </form>\n      <div id="spotify-player"></div>\n    '
    ]
  ),
  _templateObject2 = _taggedTemplateLiteral(
    [
      '\n      <button id="search_artists">\n        Search\n      </button>\n    '
    ],
    [
      '\n      <button id="search_artists">\n        Search\n      </button>\n    '
    ]
  ),
  _templateObject3 = _taggedTemplateLiteral(
    ['\n      <section id="container"></section>\n    '],
    ['\n      <section id="container"></section>\n    ']
  );

var _createDom = require("../helpers/create-dom");

var _addToStorage = require("../helpers/add-to-storage");

var _router = require("../router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var router = new _router2.default();

var CreateModal = (function() {
  function CreateModal() {
    _classCallCheck(this, CreateModal);
  }

  _createClass(CreateModal, [
    {
      key: "createArtistFormDom",
      value: function createArtistFormDom() {
        var _this = this;

        var formDom = (0, _createDom.escapeTemplate)(_templateObject);

        (0, _createDom.createDOM)({ html: formDom, tag: "body" });

        var buttonDOM = (0, _createDom.escapeTemplate)(_templateObject2);

        (0, _createDom.createDOM)({ html: buttonDOM, tag: "search" });

        var containerDOM = (0, _createDom.escapeTemplate)(_templateObject3);

        (0, _createDom.createDOM)({ html: containerDOM, tag: "body" });

        //adds click event to button;
        document
          .getElementById("search_artists")
          .addEventListener("click", function(event) {
            if (event.preventDefault) {
              event.preventDefault();
            }
            _this._getParamsFromHash();
          });

        //adds onEnter to the input
        document
          .getElementById("find-artist")
          .addEventListener("keypress", function(event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              _this._getParamsFromHash();
            }
          });
      }
    },
    {
      key: "_getParamsFromHash",
      value: function _getParamsFromHash() {
        var val = document.getElementById("find-artist").value;
        router.setHash("/artist/" + val);
        router.getParamsFromHash(router.getHash());
        (0, _addToStorage.addToStorage)("hash", "/artist/" + val);
      }
    }
  ]);

  return CreateModal;
})();

// import { createDOM, escapeTemplate } from '../helpers/create-dom';
// import { iff } from '../helpers/if-template';
// import Router from '../router';
//
// const router = new Router();
//
// // creates a Modal Container that can be added to any route
// //TODO: add css to make this fade in to the dom
// export default class CreateModal {
//   createModal(...args) {
//     const modalDom = escapeTemplate
//     `<section id="modal">
//         <div class="modal-dialog" role="document">
//           <header class="modal-header">
//             <h4>${args[0].title}</h4>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//             <span aria-hidden="true">×</span>
//           </button>
//           </header>
//           <div id="modal-container" class="modal-body"></div>
//           <div class="modal-footer" id="modal-footer"></div>
//         </div>
//     </section>`
//
//     createDOM({ html: modalDom, tag: 'body' });
//
//     //adds click event to close button;
//     document.querySelector('.close').addEventListener('click', () => {
//       router.goBack(); // should be added to router
//     });
//   }
//
//  createButtons(...args) {
//    const params = args[0];
//    params.forEach((arg) => {
//      let dom = escapeTemplate
//        `
//         <button id="${arg.id}">${arg.value}</button>
//        `
//      createDOM({ html: dom, tag: 'modal-footer' });
//    });
//  }
// }

exports.default = CreateModal;
