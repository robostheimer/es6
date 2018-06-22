'use strict'

export function hasNumber(str) {
    return /\d/.test(str);
}

export function removeNumbers(str) {
    if(hasNumber(str)) {
        return str.replace(/\d/g, '');
    }
    return str;
}

export function getNumber(str) {
    if(hasNumber(str)) {
        return str.replace(/\D/g, '')
    }
    return str;
}

export function createArray(str, separator) {
    const sep = separator ||  '';
    return str.split(sep);
}
// TODO clean this up
export function normalizeParams(params, separator) {
    const obj = {};
    const paramsArr = separator ? params.split(separator) : [params];
    
    paramsArr.forEach((param)=> {
     const splitParam = param.split('=')
     const key = splitParam[0]
     const value = splitParam[1];

     obj[key] = createArray(value, ',');
 })
  return obj;
}