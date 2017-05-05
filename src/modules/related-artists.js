'use strict'

import $ from '../../node_modules/jquery/dist/jquery.min';

export default class RelatedArtist {
  //TODO: memoize this method
  fetchRelatedArtists(id) {
    return $.getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  }
}
