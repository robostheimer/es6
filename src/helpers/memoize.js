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
