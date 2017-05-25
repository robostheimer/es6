(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _artist = require('./modules/artist');

var _artist2 = _interopRequireDefault(_artist);

var _artistForm = require('./modules/artist-form');

var _artistForm2 = _interopRequireDefault(_artistForm);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var artist = new _artist2.default();
var form = new _artistForm2.default();
var router = new _router2.default();

function init() {
  form.createArtistFormDom('click');
  router.logHash();
  var hash = window.location.hash.replace('#', ''),
      args = createHashArgs(hash);

  if (hash) {
    router.makeHash(args.route, args.id);
  }

  $(window).on('hashchange', function () {
    var hash = window.location.hash.replace('#', ''),
        args = createHashArgs(hash);
    if (hash) {
      router.makeHash(args.route, args.id);
    }
  });
}

function createHashArgs(hash) {
  var hashArr = void 0,
      route = void 0,
      id = void 0;

  hashArr = hash.split('_');
  route = hashArr[0];
  id = hashArr[1];

  return { id: id, route: route };
}

$(document).ready(init);
},{"./modules/artist":8,"./modules/artist-form":7,"./router":10}],2:[function(require,module,exports){
'use strict';

//import $ from '../../node_modules/jquery/dist/jquery.min';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDOM = createDOM;
exports.addAjaxAction = addAjaxAction;
exports.escapeTemplate = escapeTemplate;

var _eachTemplate = require('./each-template');

var _eachTemplate2 = _interopRequireDefault(_eachTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Accepts tag and html (template literal string) options and appends them to the DOM
function createDOM(options) {
  var tag = document.querySelector(options.tag) ? document.querySelector(options.tag) : document.getElementById(options.tag);
  var html = options.html;

  //TODO Figure out a better way to deal with this; shouldn't have to remove DOM
  // should be dealt with on the class level; i.e. the class should be smart enough
  // to know whether to show this or not
  tag.innerHTML += html;
}

// Pattern that adds ajax actions to dom elements that are attached to specific classes
// Typical use case would be to ceate a component and then add an ajax action to that component
// If ajax action requires the DOM to change that the methods array should contain more than one
// the second of which would create the dom
// @param options {object}
//  options.id: {String} id attr of the DOM node that has the ajax action added to it
//  options.action: {String} that represents the action to be added (i.e. 'click')
//  options.addDOM: {Boolean} flag that tells method if DOM should be added
//  options.type: {Class} the parent class that provides the ajax action
//  options.methods {Array} array of strings that are the methods to be called from the Class

function addAjaxAction(options) {
  var id = options.id;
  var action = options.action;
  var addDom = true;
  var type = options.type;
  var methods = options.methods; // includes method names and optional params object to be passed to the method
  var replace = options.replace;
  document.getElementById(id).addEventListener(action, function (e) {
    var targetId = _findId(e.target, id);

    var title = e.target.title;
    if (methods && type) {
      type[methods[0].method](targetId).then(function (data) {
        if (addDom && methods[1]) {
          if (data.artists.items) {
            data.artists = data.artists.items;
          }
          methods[1].params.id = targetId;
          methods[1].params.title = title;
          type[methods[1].method](data.artists, methods[1].params);
        }
      });
    }
  });
}

function escapeTemplate(literalSections) {
  // Use raw literal sections: we don’t want
  // backslashes (\n etc.) to be interpreted
  var raw = literalSections.raw;

  var result = '';

  for (var _len = arguments.length, substs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substs[_key - 1] = arguments[_key];
  }

  substs.forEach(function (subst, i) {
    // Retrieve the literal section preceding
    // the current substitution
    var lit = raw[i];

    // In the example, map() returns an array:
    // If substitution is an array (and not a string),
    // we turn it into a string
    if (Array.isArray(subst)) {
      subst = subst.join('');
    }

    // If the substitution is preceded by a dollar sign,
    // we escape special characters in it
    if (lit.endsWith('$')) {
      subst = htmlEscape(subst);
      lit = lit.slice(0, -1);
    }
    result += lit;
    result += subst;
  });
  // Take care of last literal section
  // (Never fails, because an empty template string
  // produces one literal section, an empty string)
  result += raw[raw.length - 1]; // (A)

  return result;
}

function _findId(target) {
  if (target.id) {
    return target.id;
  }
  return $(target.closest('[id]')).attr('id');
}
},{"./each-template":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepFind = deepFind;
function deepFind(obj, path) {

  var paths = path.split('.'),
      current = obj,
      i = void 0;
  for (i = 0; i < paths.length; i++) {
    // checks if the property has an index associated with it; i.e.
    // if the script is looking for a specific index of an array that
    // is part of the JSON payload
    if (paths[i].indexOf('[') > -1) {
      var pathsSplit = paths[i].split('[');
      var newProp = pathsSplit[0];
      var index = pathsSplit[1].replace(']', '');
      var temp = current[newProp] ? current[newProp][index] : '';
      temp ? current = temp : current = current;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}
},{}],4:[function(require,module,exports){
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
    var props = _returnAllKeys(item);
    var index = data.indexOf(item);

    return '\n      <' + tag + ' ' + _runAttrs(attrs, item, props) + '>\n        ' + (txt ? _parseText(item, txt, props) : 'txt parameter is undefined.') + '\n      </' + tag + '>\n      ';
  }).join('');
  return dom;
}

function _parseText(item, txt, props) {
  if (item && txt && props) {
    var txtPropsArr = txt.match(/{{(.*?)}}/g);
    var property = void 0;

    txtPropsArr.forEach(function (tp) {
      var txtRepl = tp.slice(tp.indexOf('{{') + 2, tp.indexOf('}}'));
      // if(_checkForIndex(txtRepl))
      // {
      //   txtRepl = _formatProperty(txtRepl)
      // }
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
},{"./deep-find":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iff = iff;
function iff(condition, option1, option2) {
  return condition ? option1 : option2;
}
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoized = memoized;
exports.memoizeJSON = memoizeJSON;
var cache = {};

function memoized(key) {
  return cache[key] !== undefined;
}

function memoizeJSON() {
  var args = arguments;
  var key = args[0].key;
  var fn = args[0].fn;

  if (!cache[key]) {
    cache[key] = fn().then(function (data) {
      return data.json();
    });
  }

  return cache[key];
}
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <form id="search">\n        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>\n      </form>\n    '], ['\n      <form id="search">\n        <input type="text" id="find-artist" placeholder="Search for you favorite musician"/>\n      </form>\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      <button id="search">\n        Search\n      </button>\n    '], ['\n      <button id="search">\n        Search\n      </button>\n    ']);

var _createDom = require('../helpers/create-dom');

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = new _router2.default();

var ArtistForm = function () {
  function ArtistForm() {
    _classCallCheck(this, ArtistForm);
  }

  _createClass(ArtistForm, [{
    key: 'createArtistFormDom',
    value: function createArtistFormDom() {
      var _this = this;

      var formDom = (0, _createDom.escapeTemplate)(_templateObject);

      (0, _createDom.createDOM)({ html: formDom, tag: 'body' });

      var linkDom = (0, _createDom.escapeTemplate)(_templateObject2);

      (0, _createDom.createDOM)({ html: linkDom, tag: 'search' });
      //adds click event to button
      document.getElementById('search').addEventListener('click', function (e) {
        e.preventDefault();
        _this._makeHash();
      });

      //adds onEnter to the input
      document.getElementById('find-artist').addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          _this._makeHash();
        }
      });
    }
  }, {
    key: '_makeHash',
    value: function _makeHash() {
      var val = document.getElementById('find-artist').value;

      router.makeHash('artist', val);
    }
  }]);

  return ArtistForm;
}();

exports.default = ArtistForm;
},{"../helpers/create-dom":2,"../router":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <ul id="artists" class="cards">\n        ', '\n      </ul>\n    '], ['\n      <ul id="artists" class="cards">\n        ', '\n      </ul>\n    ']);

var _relatedArtists = require('./related-artists');

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _memoize = require('../helpers/memoize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var related = new _relatedArtists2.default();

var Artist = function () {
  function Artist() {
    _classCallCheck(this, Artist);
  }

  _createClass(Artist, [{
    key: 'fetchArtists',

    //TODO: memoize this method javascript ninja book

    value: function fetchArtists(name) {
      var url = 'https://api.spotify.com/v1/search?q=' + name + '&type=artist';

      if (name) {
        var data = (0, _memoize.memoizeJSON)({ key: name,
          fn: function fn() {
            return fetch(url);
          }
        });

        return data;
      }
    }

    //TODO: Try to think about how to abstract this to use for all situations of creating dom
    //perhaps a recursive function of

  }, {
    key: 'createArtistDom',
    value: function createArtistDom(data) {
      //, params) {
      $('#artists').remove();
      //const action = params.action;
      var dom = (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: data.artists.items,
        tag: 'li',
        txt: '<a href="#related_{{id}}">\n                  <div>\n                    <strong>{{name}}</strong>\n                  </div>\n                </a>\n                ',
        attrs: {
          class: 'artist',
          title: null,
          id: null,
          style: 'background-image:url({{images[0].url}})'
        }
      }));

      (0, _createDom.createDOM)({ html: dom, tag: 'body' });
    }
  }]);

  return Artist;
}();

exports.default = Artist;
},{"../helpers/create-dom":2,"../helpers/each-template":4,"../helpers/memoize":6,"./related-artists":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <ul id="related-artists" class="cards related">\n        <h4>Related Musicians</h4>\n        ', '\n      </ul>\n      '], ['\n      <ul id="related-artists" class="cards related">\n        <h4>Related Musicians</h4>\n        ', '\n      </ul>\n      ']);

var _createDom = require('../helpers/create-dom');

var _eachTemplate = require('../helpers/each-template');

var _ifTemplate = require('../helpers/if-template');

var _memoize = require('../helpers/memoize');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RelatedArtists = function () {
  function RelatedArtists() {
    _classCallCheck(this, RelatedArtists);
  }

  _createClass(RelatedArtists, [{
    key: 'fetchRelatedArtists',

    //TODO: memoize this method; see javascript ninja book
    value: function fetchRelatedArtists(id) {
      if (id && !(0, _memoize.memoized)(id)) {

        var url = 'https://api.spotify.com/v1/artists/' + id + '/related-artists';

        var data = (0, _memoize.memoizeJSON)({ key: id,
          fn: function fn() {
            return fetch(url);
          }
        });
        return data;
      }
    }
  }, {
    key: 'createRelatedArtistsDom',
    value: function createRelatedArtistsDom(data, params) {
      var dom = (0, _ifTemplate.iff)(data.artists.length > 0, (0, _createDom.escapeTemplate)(_templateObject, (0, _eachTemplate.each)({
        data: data.artists,
        tag: 'a',
        txt: '<li>{{name}}</li>',
        attrs: {
          class: 'related-artist',
          id: null,
          href: '#artist_{{id}}'
        }
      })), '<p><strong>There are no artists related</strong</p>');
      (0, _createDom.createDOM)({ html: dom, tag: 'body' });
    }
  }]);

  return RelatedArtists;
}();

exports.default = RelatedArtists;
},{"../helpers/create-dom":2,"../helpers/each-template":4,"../helpers/if-template":5,"../helpers/memoize":6}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _artist = require('./modules/artist');

var _artist2 = _interopRequireDefault(_artist);

var _relatedArtists = require('./modules/related-artists');

var _relatedArtists2 = _interopRequireDefault(_relatedArtists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = window.location.hash.replace('#', '');
var artist = new _artist2.default();
var related = new _relatedArtists2.default();

var routeMap = {
  artist: {
    className: artist,
    fetch: 'fetchArtists',
    dom: 'createArtistDom'
  },
  related: {
    className: related,
    fetch: 'fetchRelatedArtists',
    dom: 'createRelatedArtistsDom'
  }
};

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, [{
    key: 'logHash',
    value: function logHash() {
      console.log(hash);
    }
  }, {
    key: 'makeHash',
    value: function makeHash(route, id) {
      window.location.hash = route + '_' + id;
      this.hashToData(route, id);
    }
  }, {
    key: 'hashToData',
    value: function hashToData(route, id) {
      var className = routeMap[route].className;
      var prop = routeMap[route];

      className[prop.fetch](id).then(function (data) {
        className[prop.dom](data);
      });
    }
  }]);

  return Router;
}();

exports.default = Router;
},{"./modules/artist":8,"./modules/related-artists":9}]},{},[1]);
