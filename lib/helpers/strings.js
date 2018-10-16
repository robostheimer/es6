"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasNumber = hasNumber;
exports.removeNumbers = removeNumbers;
exports.getNumber = getNumber;
exports.createArray = createArray;
exports.normalizeParams = normalizeParams;
function hasNumber(str) {
  return (/\d/.test(str)
  );
}

function removeNumbers(str) {
  if (hasNumber(str)) {
    return str.replace(/\d/g, "");
  }
  return str;
}

function getNumber(str) {
  if (hasNumber(str)) {
    return str.replace(/\D/g, "");
  }
  return str;
}

function createArray(str, separator) {
  var sep = separator || "";
  return str.split(sep);
}
// TODO clean this up
function normalizeParams(params, separator, conj, nestObj) {
  //const obj = {};
  var arr = [];
  var paramsArr = separator ? params.split(separator) : [params];

  paramsArr.forEach(function (param) {
    var splitParam = param.split("=");
    var key = nestObj ? nestObj + "." + splitParam[0] : splitParam[0];
    var value = splitParam[1];

    arr.push(key + ":" + value);
  });

  return "(" + conj + "~" + arr.join("_") + ")";
}