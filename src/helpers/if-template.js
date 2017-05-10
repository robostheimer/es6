'use strict'

export function iff(condition, option1, option2) {
  console.log(condition, condition ? option1 : option2);
  return condition ? option1: option2;
}
