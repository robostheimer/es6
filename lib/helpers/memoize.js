'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoized = memoized;
exports.memoize = memoize;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var cache = {};

function memoized(key) {
  var data = data || {};
  return data[key] !== undefined ? data[key] : data[key] = this.apply(this, arguments);
}

function memoize() {
  var _console;

  // let args = arguments;
  // let name = args[0].name;
  // let fn = args[0].fn;
  (_console = console).log.apply(_console, _toConsumableArray(args));
  if (!cache[name]) {
    cache[name] = fn().then(function (data) {
      return data.json();
    });
  }

  return cache[name];
}

// var memoize = function(f) {  
//    var cache = {};   
//     return function() {     
//       var arg_str = JSON.stringify(arguments);     
//       cache[arg_str] = cache[arg_str] || f.apply(f, arguments);     r
//       eturn cache[arg_str];  
//     };
//   };