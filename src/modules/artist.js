'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';

export default class Artist {
  //TODO: memoize this method
  fetchArtists() {
    return $.getJSON('https://api.spotify.com/v1/artists?ids=7jy3rLJdDQY21OgRLCZ9sD,5xUf6j4upBrXZPg6AI4MRK');
  }
}
