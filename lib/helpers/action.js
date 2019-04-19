"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.action = action;
function action(options) {
    var tag = options.tag;
    var type = options.type || "click";
    var fn = options.fn;
    var fnParam = options.params;
    document.querySelector(tag).addEventListener(type, function () {
        fn(fnParam);
    });
}