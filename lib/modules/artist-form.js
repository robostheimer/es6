'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <form id="search">\n        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>\n      </form>\n    '], ['\n      <form id="search">\n        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>\n      </form>\n    ']),
<<<<<<< HEAD
    _templateObject2 = _taggedTemplateLiteral(['\n      <button>\n        Seach\n      </button>\n    '], ['\n      <button>\n        Seach\n      </button>\n    ']);
=======
    _templateObject2 = _taggedTemplateLiteral(['\n      <a href="#artist_', '">\n        Seach\n      </a>\n    '], ['\n      <a href="#artist_', '">\n        Seach\n      </a>\n    ']);
>>>>>>> be58cecb2766f6b185beecf36b3701d530c0115d

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _createDom = require('../helpers/create-dom');

var _artist = require('./artist');

var _artist2 = _interopRequireDefault(_artist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var artist = new _artist2.default();

var ArtistForm = function () {
  function ArtistForm() {
    _classCallCheck(this, ArtistForm);
  }

  _createClass(ArtistForm, [{
    key: 'createArtistFormDom',
    value: function createArtistFormDom(action) {
      var formDom = (0, _createDom.escapeTemplate)(_templateObject);

      (0, _createDom.createDOM)({ html: formDom, tag: 'body' });

<<<<<<< HEAD
      var linkDom = (0, _createDom.escapeTemplate)(_templateObject2);
=======
      var linkDom = (0, _createDom.escapeTemplate)(_templateObject2, (0, _jquery2.default)('#find-artist').val());
>>>>>>> be58cecb2766f6b185beecf36b3701d530c0115d

      (0, _createDom.createDOM)({ html: linkDom, tag: 'search' });

      if (action) {
<<<<<<< HEAD
        (0, _createDom.addAjaxAction)({
          action: action,
          id: 'search',
          type: artist,
          methods: [{
            method: 'fetchArtists'
          }, {
            method: 'createArtistDom'
          }],
          addDom: true // whether there will be dom added based on this action
        });
=======
        // addAjaxAction({
        //   action: action,
        //   id: 'search',
        //   type: artist,
        //   methods: [
        //     {
        //       method: 'fetchArtists'
        //     },
        //     {
        //       method: 'createArtistDom',
        //       params: {
        //         action: 'click'
        //       }
        //     }
        //   ],
        //   addDom: true // whether there will be dom added based on this action
        // });
>>>>>>> be58cecb2766f6b185beecf36b3701d530c0115d
      }
    }
  }]);

  return ArtistForm;
}();

exports.default = ArtistForm;