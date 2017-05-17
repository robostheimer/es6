'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepFind = deepFind;
function deepFind(obj, path) {
  debugger;
  var paths = path.split('.'),
      current = obj,
      i = void 0;
  for (i = 0; i < paths.length; i++) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }

  return current;
}