"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepFind = deepFind;
function deepFind(obj, path) {
  var paths = path.split("."),
      current = obj,
      i = void 0;
  for (i = 0; i < paths.length; i++) {
    // checks if the property has an index associated with it; i.e.
    // if the script is looking for a specific index of an array that
    // is part of the JSON payload
    if (paths[i].indexOf("[") > -1) {
      var pathsSplit = paths[i].split("[");
      var newProp = pathsSplit[0];
      var index = pathsSplit[1].replace("]", "");
      var temp = current[newProp] ? current[newProp][index] : "";
      temp ? current = temp : current = current;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}