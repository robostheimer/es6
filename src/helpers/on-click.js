"use strict";

export function onClick(options) {
  const tag = options.tag;
  const fn = options.fn;
  const fnParam = options.params;

  document.querySelector(tag).addEventListener("click", () => {
    fn(fnParam);
  });
}
