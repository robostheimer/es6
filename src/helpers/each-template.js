'use strict'

export function each(options) {
  const data = options.data;
  const tag = options.tag;
  let attrs = options.attrs;
  const props = options.props
  let txt = options.txt;

  const dom = data.map(item => {
    let index = data.indexOf(item);
    attrs.id = item.id ? item.id : `item${index}`;

    return `
      <${tag} ${runAttrs(attrs)}>
        ${txt ? parseText(item, txt, props): item[props[0]] }
      </${tag}>
      `}).join('');
  return dom;
}

//TODO: work out the kinks with this helper method
function parseText(item, txt, props) {
  if(item && txt && props) {
    let txtArr = txt.split('{{');
    let newStr = '';
    props.forEach((prop) => {
      let index = props.indexOf(prop)
      if(txt.match(prop)) {
        let propRp = `${prop}}}`
        newStr+= txtArr[index+1].replace(propRp, item[prop]);
      }
    })
  return newStr;
  }
  return txt;
}

function runAttrs(attrs) {
  let str = '';
  let val;

  for(val in attrs) {
    str += `${val}="${attrs[val]}" `;
  }
  return str;
}
