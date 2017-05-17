'use strict'
const cache = {};

export function memoized(key) {
  return cache[key] !== undefined;
}

export function memoizeJSON() {
  let args = arguments;
  let key = args[0].key;
  let fn = args[0].fn;

  if(!cache[key]) {
    cache[key] = fn().then((data) => {
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
