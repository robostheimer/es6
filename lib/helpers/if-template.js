'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.condition = condition;
function condition(condtion, option1, option2) {
  console.log(condition ? option1 : option2);
  return condition ? option1 : option2;
}