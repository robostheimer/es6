'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDOM = createDOM;
exports.addAjaxAction = addAjaxAction;

var _jquery = require('../../node_modules/jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _eachTemplate = require('./each-template');

var _eachTemplate2 = _interopRequireDefault(_eachTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Accepts tag and html (template literal string) options and appends them to the DOM
function createDOM(options) {
  var tag = options.tag === 'body' ? options.tag : '#' + options.tag;
  var html = options.html;
  var clearElement = options.clearElement;
  (0, _jquery2.default)(tag).children().html('');
  //TODO:create a each/loop helper and import
  (0, _jquery2.default)(tag).append(html);
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

function addAjaxAction(options) {
  var id = options.id;
  var action = options.action;
  var addDom = true;
  var type = options.type;
  var methods = options.methods;
  console.log((0, _jquery2.default)(id)[action]());

  document.getElementById(id).addEventListener(action, function (e) {
    var id = e.target.id;

    if (methods && type) {
      type[methods[0]](id).then(function (data) {
        if (addDom && methods[1]) {
          type[methods[1]](data.artists, id);
        }
      });
    }
  });
}