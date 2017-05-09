'use strict'

export function each(options) {
  const data = options.data;
  const tag = options.tag;
  let attrs = options.attrs;
  let txt = options.txt;

  const dom = data.map(item => {
    let props =  returnAllKeys(item);
    let index = data.indexOf(item);
    attrs.id = item.id ? item.id : `item${index}`;

    return `
      <${tag} ${runAttrs(attrs)}>
        ${txt ? parseText(item, txt, props): 'txt parameter is undefined.' }
      </${tag}>
      `}).join('');
  return dom;
}

//TODO: work out the kinks with this helper method
function parseText(item, txt, props) {
  if(item && txt) {
    let newStr = '';
    props.forEach((prop) => {
      let index = props.indexOf(prop)
      if(txt.match(prop)) {
        txt = txt.replace(`{{${prop}}}`, item[prop]);
      }
    })
  return txt;
  } else {
    return txt;
  }
}

function runAttrs(attrs) {
  let str = '';
  let val;

  for(val in attrs) {
    str += `${val}="${attrs[val]}" `;
  }
  return str;
}

function returnAllKeys(item) {
  let arr = [];
  let val;

  for(val in item) {
    arr.push(val);
  }
  return arr;
}
