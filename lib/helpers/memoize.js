'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoized = memoized;
exports.memoize = memoize;
var cache = {};

function memoized(key) {
  var data = data || {};
  return data[key] !== undefined ? data[key] : data[key] = this.apply(this, arguments);
}

function memoize() {
  var args = arguments;
  var name = args[0].name;
  var fn = args[0].fn;
  if (!cache[name]) {
    cache[name] = fn().then(function (data) {
      return data.json();
    });
  }

  debugger;
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