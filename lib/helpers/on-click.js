"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onClick = onClick;
function onClick(options) {
  var tag = options.tag;
  var fn = options.fn;
  var fnParam = options.params;

  document.querySelector(tag).addEventListener("click", function () {
    fn(fnParam);
  });
}