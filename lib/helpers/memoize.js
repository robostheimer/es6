'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoized = memoized;
<<<<<<< HEAD
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
=======
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
>>>>>>> 731bbb780ceb365b46b16e73a9741a5f05f69110
      return data.json();
    });
  }

<<<<<<< HEAD
  return cache[key];
=======
  debugger;
  return cache[name];
>>>>>>> 731bbb780ceb365b46b16e73a9741a5f05f69110
}

// var memoize = function(f) {  
//    var cache = {};   
//     return function() {     
//       var arg_str = JSON.stringify(arguments);     
//       cache[arg_str] = cache[arg_str] || f.apply(f, arguments);     r
//       eturn cache[arg_str];  
//     };
//   };