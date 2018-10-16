"use strict";

export function hasNumber(str) {
  return /\d/.test(str);
}

export function removeNumbers(str) {
  if (hasNumber(str)) {
    return str.replace(/\d/g, "");
  }
  return str;
}

export function getNumber(str) {
  if (hasNumber(str)) {
    return str.replace(/\D/g, "");
  }
  return str;
}

export function createArray(str, separator) {
  const sep = separator || "";
  return str.split(sep);
}
// TODO clean this up
export function normalizeParams(params, separator, conj, nestObj) {
  //const obj = {};
  const arr = [];
  const paramsArr = separator ? params.split(separator) : [params];

  paramsArr.forEach(param => {
    const splitParam = param.split("=");
    const key = nestObj ? `${nestObj}.${splitParam[0]}` : splitParam[0];
    const value = splitParam[1];

    arr.push(`${key}:${value}`);
  });

  return `(${conj}~${arr.join("_")})`;
}
