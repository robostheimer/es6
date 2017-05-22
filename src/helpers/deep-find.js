'use strict'

export function deepFind(obj, path) {

  let paths = path.split('.'),
    current = obj,
    i;
  for (i = 0; i < paths.length; i++) {
    // checks if the property has an index associated with it; i.e.
    // if the script is looking for a specific index of an array that
    // is part of the JSON payload
    if (paths[i].indexOf('[') > -1) {
      let pathsSplit = paths[i].split('[');
      let newProp = pathsSplit[0]
      let index = pathsSplit[1].replace(']','');
      let temp = current[newProp] ? current[newProp][index] : '';
      temp ? current = temp : current = current;
    }
    else {
      current = current[paths[i]];
    }
  }
  return current;
}
