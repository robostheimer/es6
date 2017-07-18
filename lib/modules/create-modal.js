'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['<section id="modal">\n        <div class="modal-dialog" role="document">\n          <header class="modal-header">\n            <h4>Info about ', '</h4>\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n            <span aria-hidden="true">\xD7</span>\n          </button>\n          </header>\n          <div id="modal-container" class="modal-body"></div>\n          <div class="modal-footer" style="display: none;"></div>\n        </div>\n    </section>'], ['<section id="modal">\n        <div class="modal-dialog" role="document">\n          <header class="modal-header">\n            <h4>Info about ', '</h4>\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n            <span aria-hidden="true">\xD7</span>\n          </button>\n          </header>\n          <div id="modal-container" class="modal-body"></div>\n          <div class="modal-footer" style="display: none;"></div>\n        </div>\n    </section>']);

var _createDom = require('../helpers/create-dom');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// creates a Modal Container that can be added to any route
var CreateModal = function () {
  function CreateModal() {
    _classCallCheck(this, CreateModal);
  }

  _createClass(CreateModal, [{
    key: 'createModal',
    value: function createModal() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var modalDom = (0, _createDom.escapeTemplate)(_templateObject, args[0].title);

      (0, _createDom.createDOM)({ html: modalDom, tag: 'body' });

      //adds click event to close button;
      document.querySelector('.close').addEventListener('click', function (event) {
        window.history.back(); // should be added to router
      });
    }
  }]);

  return CreateModal;
}();

exports.default = CreateModal;