'use strict'

class Artist {

  printArtists() {
    $.getJSON('https://api.spotify.com/v1/artists?ids=7jy3rLJdDQY21OgRLCZ9sD,5xUf6j4upBrXZPg6AI4MRK'). then((data) => {
      const artists = data.artists;
      const names = `<ul id="artists">
        ${artists.map(artist =>
          `<li id="${artist.id}" style="cursor: pointer">${artist.name}'s id: ${artist.id}</a></li>`
        ).join('')}
        </ul>`
      document.body.innerHTML = names;

      $('#artists').click((e) => {
        const id = document.getElementById(e.target.id);
        console.log(id.length)
        this.printRelatedArtists(e.target.id).then((data) => {
          const related = data.artists
          const relatedArtists = `<ul>
            ${related.map(artist =>
              `<li>${artist.name}</li>`
            ).join('')}
          </ul>`
          console.log(relatedArtists)
          document.getElementById(e.target.id).innerHTML+= relatedArtists;
        });
      })

    })
  }

  printRelatedArtists(id) {
    return $.getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  }
}

const artist = new Artist();
artist.printArtists();
