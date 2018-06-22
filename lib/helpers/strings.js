'use strict';

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

function createArray(str, separator) {
    var sep = separator || '';
    return str.split(sep);
}
// TODO clean this up
function normalizeParams(params, separator) {
    var obj = {};
    var paramsArr = separator ? params.split(separator) : [params];

    paramsArr.forEach(function (param) {
        var splitParam = param.split('=');
        var key = splitParam[0];
        var value = splitParam[1];

        obj[key] = createArray(value, ',');
    });
    return obj;
}