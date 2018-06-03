'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasNumber = hasNumber;
exports.removeNumbers = removeNumbers;
exports.getNumber = getNumber;
function hasNumber(str) {
    return (/\d/.test(str)
    );
}

function removeNumbers(str) {
    if (hasNumber(str)) {
        return str.replace(/\d/g, '');
    }
    return str;
}

function getNumber(str) {
    if (hasNumber(str)) {
        return str.replace(/\D/g, '');
    }
    return str;
}