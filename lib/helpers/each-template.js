'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = each;
function each(options) {
  var data = options.data;
  var tag = options.tag;
  var attrs = options.attrs;
  var txt = options.txt;

  var dom = data.map(function (item) {
    var props = returnAllKeys(item);
    var index = data.indexOf(item);
    attrs.id = item.id ? item.id : 'item' + index;

    return '\n      <' + tag + ' ' + runAttrs(attrs) + '>\n        ' + (txt ? parseText(item, txt, props) : 'txt parameter is undefined.') + '\n      </' + tag + '>\n      ';
  }).join('');
  return dom;
}

//TODO: work out the kinks with this helper method
function parseText(item, txt, props) {
  if (item && txt && props) {
    var newStr = '';
    props.forEach(function (prop) {
      var index = props.indexOf(prop);
      if (txt.match(prop)) {
        txt = txt.replace('{{' + prop + '}}', item[prop]);
      }
    });
    return txt;
  } else {
    return item;
  }
}

function runAttrs(attrs) {
  var str = '';
  var val = void 0;

  for (val in attrs) {
    str += val + '="' + attrs[val] + '" ';
  }
  return str;
}

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