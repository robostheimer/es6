'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = each;
function each(options) {
  var data = options.data;
  var tag = options.tag;
  var attrs = options.attrs;
  var props = options.props;
  var txt = options.txt;

  var dom = data.map(function (item) {
    var index = data.indexOf(item);
    attrs.id = item.id ? item.id : 'item' + index;

    return '\n      <' + tag + ' ' + runAttrs(attrs) + '>\n        ' + (txt ? parseText(item, txt, props) : item[props[0]]) + '\n      </' + tag + '>\n      ';
  }).join('');
  return dom;
}

//TODO: work out the kinks with this helper method
function parseText(item, txt, props) {
  if (item && txt && props) {
    var txtArr = txt.split('{{');
    var newStr = '';
    props.forEach(function (prop) {
      var index = props.indexOf(prop);
      if (txt.match(prop)) {
        var propRp = prop + '}}';
        newStr += txtArr[index + 1].replace(propRp, item[prop]);
      }
    });
    return newStr;
  }
  return txt;
}

function runAttrs(attrs) {
  var str = '';
  var val = void 0;

  for (val in attrs) {
    str += val + '="' + attrs[val] + '" ';
  }
  return str;
}