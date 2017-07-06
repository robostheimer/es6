'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoized = memoized;
exports.memoizeJSON = memoizeJSON;
var cache = {};

function memoized(key) {
  return cache[key] !== undefined;
}

function memoizeJSON() {
  var args = arguments;
  var key = args[0].key;
  var fn = args[0].fn;
  if (!cache[key]) {
    cache[key] = fn().then(function (data) {
      return data.json();
    });
  }

  return cache[key];
}