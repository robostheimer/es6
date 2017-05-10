'use strict'

export function each(options) {
  const data = options.data;
  const tag = options.tag;
  let attrs = options.attrs;
  let txt = options.txt;

  const dom = data.map(item => {
    let props =  returnAllKeys(item);
    let index = data.indexOf(item);

    return `
      <${tag} ${runAttrs(attrs, item, props)}>
        ${txt ? parseText(item, txt, props): 'txt parameter is undefined.' }
      </${tag}>
      `}).join('');
  return dom;
}

//TODO: work out the kinks with this helper method
function parseText(item, txt, props) {
  if(item && txt && props) {
    let newStr = '';
    props.forEach((prop) => {
      let index = props.indexOf(prop)
      if(txt.match(prop)) {
        txt = txt.replace(`{{${prop}}}`, item[prop]);
      }
    })
  return txt;
  } else {
    return item;
  }
}

function runAttrs(attrs, item, props) {
  let str = '';
  let val;
  for(val in attrs) {
    if(attrs[val]) {
      str += `${val}="${attrs[val]}" `;
    }

    str += `${val}="${item[val] || item['name'] || ""}" `;
  }
  return str;
}

function returnAllKeys(item) {
  let arr = [];
  let val;

  for(val in item) {
    if(typeof(item) !== 'string') {
      arr.push(val);
    }
  }
  return arr.length > 0 ? arr : undefined;
}
