'use strict'

export function memoize(key) {
  this.values = this.values || {};

  return this.values[key] !== undefined ?
    this.values[key]:
    this.values[key] = this.apply(this, arguments);
}
