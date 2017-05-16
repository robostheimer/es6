'use strict'
const cache = {};

export function memoized(key) {
  let data = data || {};
  return data[key] !== undefined ? data[key] : data[key] = this.apply(this, arguments);
}

export function memoize() {
  let args = arguments;
  let name = args[0].name;
  let fn = args[0].fn;

  if(!cache[name]) {
    cache[name] = fn(). then((data) => {
      return data.json();
    })
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
