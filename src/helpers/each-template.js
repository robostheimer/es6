'use strict'
import { deepFind } from './deep-find'

export function each(options) {
  const data = options.data;
  const tag = options.tag;
  let attrs = options.attrs;
  let txt = options.txt;

  const dom = data.map(item => {
    let props =  _returnAllKeys(item);
    let index = data.indexOf(item);

    return `
      <${tag} ${_runAttrs(attrs, item, props)}>
        ${txt ? _parseText(item, txt, props): 'txt parameter is undefined.' }
      </${tag}>
      `}).join('');
  return dom;
}

function _parseText(item, txt, props) {
  if(item && txt && props) {
    let txtPropsArr = txt.match(/{{(.*?)}}/g);
    let property;

    txtPropsArr.forEach((tp) => {
      let txtRepl = tp.slice(tp.indexOf('{{')+2, tp.indexOf('}}'));
      // if(_checkForIndex(txtRepl))
      // {
      //   txtRepl = _formatProperty(txtRepl)
      // }
      tp.indexOf('.') > -1 ? property = deepFind(item, txtRepl) : property = item[txtRepl];
      if(property) {
        txt = txt.replace(tp, property);
      } else {
        txt = txt.replace(tp, '');
      }
    })

    return txt;
  } else {
    return item;
  }
}

function _checkForIndex(str) {
  if(str.indexOf('[') > -1) {
    return true;
  }
  return false;
}

function _formatProperty(str) {
  if(str.indexOf('.') > -1)
  {
    return str;
  }
}


function _runAttrs(attrs, item, props) {
  let str = '';
  let val;
  for(val in attrs) {
    if(attrs[val]) {
      if(attrs[val].match(/{{(.*?)}}/g))
      {
        str += `${val} = "${_parseText(item, attrs[val], props)}"`;
      }
      str += `${val}="${attrs[val]}" `;
    }

    str += `${val}="${item[val] || item['name'] || ""}" `;
  }
  return str;
}

// function flattenObject(object) {
//   console.log(object);
// }

function _returnAllKeys(item) {
  let arr = [];
  let val;

  for(val in item) {
    if(typeof(item) !== 'string') {
      arr.push(val);
    }
  }

  return arr.length > 0 ? arr : undefined;
}
