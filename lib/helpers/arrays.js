"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenArrayOfObjects = flattenArrayOfObjects;
exports.sortObjDsc = sortObjDsc;
exports.sortArrAsc = sortArrAsc;
exports.removeDuplicatesArrObj = removeDuplicatesArrObj;
function flattenArrayOfObjects(arr, prop) {
  return arr.reduce(function (iterator, item) {
    return iterator.concat(item[prop]);
  }, []);
}
// TODO: clean this up
function sortObjDsc(arr, property, num_or_str, checkDupProperty) {
  return sortArrAsc(arr, property, num_or_str, checkDupProperty).reverse();
}
// TODO: clean this up
function sortArrAsc(arr, property, num_or_str, checkDupProperty) {
  if (num_or_str == "str") {
    var sortable = [];

    arr.sort(function (a, b) {
      return parseInt(a[property]) > parseInt(b[property]) ? 1 : parseInt(b[property]) > parseInt(a[property]) ? -1 : 0;
    });

    return arr;
  } else {
    arr.sort(function (a, b) {
      var aprop = a[property];
      var bprop = b[property];
      return bprop - aprop;
    });
  }
  //arr=arr.removeDuplicatesArrObj(checkDupProperty, false);
  return arr;
}

function removeDuplicatesArrObj(arr, property, checkmatch, checkequal) {
  var unique = { title: [], finalArr: [], notunique: [] };

  function isUnique() {
    if (checkmatch == true) {
      arr.forEach(function (item) {
        if (!unique.title.toString().replace(/\W/g, "").match(item[property].replace(/\W/g, ""))) {
          unique.title.push(item[property]);
          unique.finalArr.push(item);
        } else {
          unique.notunique.push(item);
        }
      });
    } else {
      arr.forEach(function (item) {
        if (unique.title.indexOf(item[property]) < 0) {
          unique.title.push(item[property]);
          unique.finalArr.push(item);
        } else {
          unique.notunique.push(item);
        }
      });
    }
    return unique.finalArr;
  }

  return isUnique(arr);
}