'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.flattenJSON = flattenJSON;
exports.merge = merge;
function flattenJSON(obj, name, stem) {
  var out = {};
  console.log(name);
  var newStem = typeof stem !== 'undefined' && stem !== '' ? stem + '_' + name : name;

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    out[newStem] = obj;
    return out;
  }

  // for (var p in obj) {
  //   var prop = flattenJSON(obj[p], p, newStem);
  //   out = merge([out, prop]);
  // }

  return out;
};

function merge(objects) {
  var out = {};

  for (var i = 0; i < objects.length; i++) {
    for (var p in objects[i]) {
      out[p] = objects[i][p];
    }
  }

  return out;
}