"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iff = iff;
function iff(condition, option1, option2) {
    return condition ? option1 : option2;
}