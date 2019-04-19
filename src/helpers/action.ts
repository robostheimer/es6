"use strict";
interface actionOptions {
  tag: string;
  type: string;
  params: object;
}
export function action(options) {
  const tag = options.tag;
  const type = options.type || "click";
  const fn = options.fn;
  const fnParam = options.params;

  document.querySelector(tag).addEventListener(type, () => {
    fn(fnParam);
  });
}
