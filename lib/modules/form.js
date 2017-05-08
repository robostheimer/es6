'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <form id="find-artist">\n        <input type="text" name="find-artist" placeholder="Search for you favorite musician"/>\n      </form>\n    '], ['\n      <form id="find-artist">\n        <input type="text" name="find-artist" placeholder="Search for you favorite musician"/>\n      </form>\n    ']);

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _createDom = require('../helpers/create-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArtistForm = function () {
  function ArtistForm() {
    _classCallCheck(this, ArtistForm);
  }

  _createClass(ArtistForm, [{
    key: 'createArtistFormDom',


    //TODO: Try to think about how to abstract this to use for all situations of creating dom
    //perhaps a recursive function of
    value: function createArtistFormDom() {
      //TODO:create a each/loop helper and import
      var dom = (0, _createDom.escapeTemplate)(_templateObject);

      (0, _createDom.createDOM)({ html: dom, tag: 'body' });
    }
  }]);

  return ArtistForm;
}();

exports.default = ArtistForm;