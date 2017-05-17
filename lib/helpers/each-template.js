'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = each;

var _deepFind = require('./deep-find');

function each(options) {
  var data = options.data;
  var tag = options.tag;
  var attrs = options.attrs;
  var txt = options.txt;

  var dom = data.map(function (item) {
    var props = returnAllKeys(item);
    var index = data.indexOf(item);

    return '\n      <' + tag + ' ' + runAttrs(attrs, item, props) + '>\n        ' + (txt ? parseText(item, txt, props) : 'txt parameter is undefined.') + '\n      </' + tag + '>\n      ';
  }).join('');
  return dom;
}

//TODO: work out the kinks with this helper method
function parseText(item, txt, props) {
  if (item && txt && props) {
    var txtPropsArr = txt.match(/{{(.*?)}}/g);

    var property = void 0;

    txtPropsArr.forEach(function (tp) {
      var txtRepl = tp.slice(tp.indexOf('{{') + 2, tp.indexOf('}}'));
      tp.indexOf('.') > -1 ? property = (0, _deepFind.deepFind)(item, txtRepl) : property = item[txtRepl];
      //if property is undefined replace w empty string
      if (property) {
        txt = txt.replace(tp, property);
      } else {
        txt = txt.replace(tp, '');
      }
    });

    return txt;
  } else {
    return item;
  }
}

function runAttrs(attrs, item, props) {
  var str = '';
  var val = void 0;
  for (val in attrs) {
    if (attrs[val]) {
      str += val + '="' + attrs[val] + '" ';
    }

    str += val + '="' + (item[val] || item['name'] || "") + '" ';
  }
  return str;
}

// function flattenObject(object) {
//   console.log(object);
// }

function returnAllKeys(item) {
  var arr = [];
  var val = void 0;

  for (val in item) {
    if (typeof item !== 'string') {
      arr.push(val);
    }
  }

  return arr.length > 0 ? arr : undefined;
}