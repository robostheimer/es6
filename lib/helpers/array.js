'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flatten = flatten;
function flatten() {
    return this.reduce(function (prev, curr) {
        return prev.concat(curr);
    });
}