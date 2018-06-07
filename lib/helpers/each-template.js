'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = each;
exports.createArrayFromFusionData = createArrayFromFusionData;

var _deepFind = require('./deep-find');

var _strings = require('./strings');

function each(options) {
  var data = options.data;
  var tag = options.tag;
  var attrs = options.attrs;
  var txt = options.txt;
  var dom = data.map(function (item) {
    var props = _returnAllKeys(item);
    var index = data.indexOf(item);

    return '\n      <' + tag + ' ' + _runAttrs(attrs, item, props) + '>\n        ' + (txt ? _parseText(item, txt, props) : 'txt parameter is undefined.') + '\n      </' + tag + '>\n      ';
  }).join('');

  return dom;
}

function createArrayFromFusionData(data, key, numOfItems, optionalProps) {
  var arr = [];
  var newData = data[0] || data;

  var _loop = function _loop() {
    var obj = {};
    for (key in newData) {
      if (parseInt((0, _strings.getNumber)(key)) === x && newData[key] !== '') {
        obj[(0, _strings.removeNumbers)(key)] = newData[key];
      }
    }
    // pull in all data and create array of objects.
    if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
      optionalProps.forEach(function (prop) {
        obj[prop] = newData[prop];
      });
      arr.push(obj);
    }
  };

  for (var x = 0; x < numOfItems; x++) {
    _loop();
  }
  return arr;
}

function _parseText(item, txt, props) {
  if (item && txt && props) {
    var txtPropsArr = txt.match(/{{(.*?)}}/g);
    var property = void 0;
    if (txtPropsArr) {
      txtPropsArr.forEach(function (tp) {
        var txtRepl = tp.slice(tp.indexOf('{{') + 2, tp.indexOf('}}'));

        tp.indexOf('.') > -1 ? property = (0, _deepFind.deepFind)(item, txtRepl) : property = item[txtRepl];
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
  return;
}

function _checkForIndex(str) {
  if (str.indexOf('[') > -1) {
    return true;
  }
  return false;
}

function _formatProperty(str) {
  if (str.indexOf('.') > -1) {
    return str;
  }
}

function _runAttrs(attrs, item, props) {
  var str = '';
  var val = void 0;

  for (val in attrs) {
    if (attrs[val]) {
      if (attrs[val].match(/{{(.*?)}}/g)) {
        str += val + ' = "' + _parseText(item, attrs[val], props) + '"';
      }
      str += val + '="' + attrs[val] + '" ';
    }

    str += val + '="' + (item[val] || item['name'] || "") + '" ';
  }
  return str;
}

// function flattenObject(object) {
//   console.log(object);
// }

function _returnAllKeys(item) {
  var arr = [];
  var val = void 0;

  for (val in item) {
    if (typeof item !== 'string') {
      arr.push(val);
    }
  }

  return arr.length > 0 ? arr : undefined;
}