"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToStorage = addToStorage;
function addToStorage(key, val) {
  sessionStorage.setItem(key, val);
}