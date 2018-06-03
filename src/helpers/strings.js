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