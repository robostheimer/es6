'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Artist = function () {
  function Artist() {
    _classCallCheck(this, Artist);
  }

  _createClass(Artist, [{
    key: 'printArtists',
    value: function printArtists() {
      var _this = this;

      $.getJSON('https://api.spotify.com/v1/artists?ids=7jy3rLJdDQY21OgRLCZ9sD,5xUf6j4upBrXZPg6AI4MRK').then(function (data) {
        var artists = data.artists;
        var names = '<ul id="artists">\n        ' + artists.map(function (artist) {
          return '<li id="' + artist.id + '" style="cursor: pointer">' + artist.name + '\'s id: ' + artist.id + '</a></li>';
        }).join('') + '\n        </ul>';
        document.body.innerHTML = names;

        $('#artists').click(function (e) {
          var id = document.getElementById(e.target.id);
          console.log(id.length);
          _this.printRelatedArtists(e.target.id).then(function (data) {
            var related = data.artists;
            var relatedArtists = '<ul>\n            ' + related.map(function (artist) {
              return '<li>' + artist.name + '</li>';
            }).join('') + '\n          </ul>';
            console.log(relatedArtists);
            document.getElementById(e.target.id).innerHTML += relatedArtists;
          });
        });
      });
    }
  }, {
    key: 'printRelatedArtists',
    value: function printRelatedArtists(id) {
      return $.getJSON('https://api.spotify.com/v1/artists/' + id + '/related-artists');
    }
  }]);

  return Artist;
}();

var artist = new Artist();
artist.printArtists();