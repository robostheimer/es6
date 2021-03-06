"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _templateObject = _taggedTemplateLiteral(
  ['\n      <button id="', '" >\n        Save Playlist\n      </button>\n    '],
  ['\n      <button id="', '" >\n        Save Playlist\n      </button>\n    ']
);

var _createDom = require("../helpers/create-dom");

var _eachTemplate = require("../helpers/each-template");

var _ifTemplate = require("../helpers/if-template");

var _memoize = require("../helpers/memoize");

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var auth_header = new Headers({
  Authorization: "Bearer " + sessionStorage.access_token
});

var post_header = new Headers({
  "Content-Type": "application/json"
});

var SavedPlaylistButton = (function() {
  function SavedPlaylistButton() {
    _classCallCheck(this, SavedPlaylistButton);
  }

  _createClass(SavedPlaylistButton, [
    {
      key: "fetchSpotifyProfile",

      //TODO: memoize this method; see javascript ninja book
      value: function fetchSpotifyProfile(name, tracks) {
        var url = "https://api.spotify.com/v1/me";

        return fetch(url, {
          method: "GET",
          headers: auth_header
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var username = data.id;
            var user_url =
              "https://api.spotify.com/v1/users/" + username + "/playlists";
            fetch(user_url, {
              headers: auth_header,
              method: "POST",
              body: JSON.stringify({
                name: name + " from ES6 app",
                public: false
              })
            })
              .then(function(json) {
                return json.json();
              })
              .then(function(json) {
                var playlist_url =
                  user_url +
                  "/" +
                  json.id +
                  "/tracks?position=0&uris=" +
                  tracks;
                return fetch(playlist_url, {
                  method: "POST",
                  headers: auth_header
                });
              });
          });
        // console.log(json);
        // const username = json.id
        // const playlist_url = 'https://api.spotify.com/v1/users/'+username+'/playlists';
        // fetch(playlist_url, {
        //   headers: auth_header,
        //   method: 'POST',
        //   data: JSON.stringify({
        //     'name': 'TEST Playlist',
        //     'public': false
        //   }),
        // })
        //})
        //   const create_url = `https://api.spotify.com/v1/users/${data.username}/playlists/${data.id}/tracks?position=0&uris=4wd09wCccmxUB7XVJp0RNn`;
        //   $.fetch(url, {
        //     method: 'POST',
        //     headers: auth_header,
        //     success: function() {
        //       alert('This '+model.artist+' '+model.type+' playlist was added to your Spotify Account!')
        //     }
        // })

        // const data = memoizeJSON({ key: 'profile',
        //   fn() {
        //     return fetch(url, {
        //       method: 'GET',
        //       headers: auth_header
        //     });
        //   }
        // });
        //
        // return data;
      }
    },
    {
      key: "createSpotifyPlaylist",
      value: function createSpotifyPlaylist(id) {
        var url = "https://api.spotify.com/v1/me";

        var data = (0, _memoize.memoizeJSON)({
          key: id,
          fn: function fn() {
            return fetch(url, {
              headers: auth_header
            });
          }
        });
        console.log(data);
        return data;
      }
    },
    {
      key: "createSaveButtonDOM",
      value: function createSaveButtonDOM(data, type) {
        var _this = this;

        var tracks = [];
        var typeMap = {
          topSongs: "Top Songs by " + data[0].artists[0].name,
          radio: "Songs inspired by " + data[0].artists[0].name
        };

        data.forEach(function(track) {
          tracks.push("spotify%3Atrack%3A" + track.id);
        });

        var buttonDOM = (0, _createDom.escapeTemplate)(
          _templateObject,
          tracks.toString()
        );

        (0, _createDom.createDOM)({ html: buttonDOM, tag: "container" });

        //adds click event to button;
        document
          .getElementById(tracks.toString())
          .addEventListener("click", function(event) {
            if (event.preventDefault) {
              event.preventDefault();
            }
            console.log(event.target.id);
            _this.fetchSpotifyProfile(typeMap[type], event.target.id);
          });
      }
    }
  ]);

  return SavedPlaylistButton;
})();

exports.default = SavedPlaylistButton;
