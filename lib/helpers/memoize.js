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

// var memoize = function(f) {  
//    var cache = {};   
//     return function() {     
//       var arg_str = JSON.stringify(arguments);     
//       cache[arg_str] = cache[arg_str] || f.apply(f, arguments);     r
//       eturn cache[arg_str];  
//     };
//   };