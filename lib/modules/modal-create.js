'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['<section id="modal">\n        <div class="modal-dialog" role="document">\n          <header class="modal-header">\n            <h4 id="modal-headline">\n              ', '\n            </h4>\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n            <span aria-hidden="true">\xD7</span>\n          </button>\n          </header>\n          <div id="modal-container" class="modal-body"></div>\n          <div class="modal-footer" id="modal-footer"></div>\n        </div>\n    </section>'], ['<section id="modal">\n        <div class="modal-dialog" role="document">\n          <header class="modal-header">\n            <h4 id="modal-headline">\n              ', '\n            </h4>\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n            <span aria-hidden="true">\xD7</span>\n          </button>\n          </header>\n          <div id="modal-container" class="modal-body"></div>\n          <div class="modal-footer" id="modal-footer"></div>\n        </div>\n    </section>']),
    _templateObject2 = _taggedTemplateLiteral(['\n        <button id="', '">', '</button>\n       '], ['\n        <button id="', '">', '</button>\n       ']);

var _createDom = require('../helpers/create-dom');

var _ifTemplate = require('../helpers/if-template');

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const router = new Router();

// creates a Modal Container that can be added to any route
//TODO: add css to make this fade in to the dom
var ModalCreate = function () {
  function ModalCreate() {
    _classCallCheck(this, ModalCreate);
  }

  _createClass(ModalCreate, [{
    key: 'createModal',
    value: function createModal() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var modalDom = (0, _createDom.escapeTemplate)(_templateObject, args[0] ? args[0].title : '');

      (0, _createDom.createDOM)({ html: modalDom, tag: 'body' });

      //adds click event to close button;
      document.querySelector('.close').addEventListener('click', function () {

        window.location.hash = sessionStorage.hash; // should be added to router
        (0, _createDom.clearDOM)('modal');
      });
    }
  }, {
    key: 'createButtons',
    value: function createButtons() {
      var params = arguments.length <= 0 ? undefined : arguments[0];
      params.forEach(function (arg) {
        var dom = (0, _createDom.escapeTemplate)(_templateObject2, arg.id, arg.value);
        (0, _createDom.createDOM)({ html: dom, tag: 'modal-footer' });
      });
    }
  }]);

  return ModalCreate;
}();

exports.default = ModalCreate;