const Library = require('../models/LibraryModel');

class LibraryController {
  constructor() {
    this.library = {};
  }
	// findSongByNameandArtist
  // findSongsByArtist
  // findSongsByAlbum

	createLibrary(user, done) {
		this.library = new Library({
			user: user,
			songs: []
		});
		this.library.save(err => {
			if (err) {
				done(err);
			} else {
				done();
			}
		});
	}

  findLibrary(user, done) {
    Library.findOne({ user }, (err, library) => {
			if (err) {
				done(err);
			} else {
				this.library = library;
				done(null, library);
			}
		});
  }

  addSong(newSong, done) {
		console.log('LIBRARY CONTROLLER - this.library.songs before adding song:', this.library.songs);
    let exists = false;
		for (let song of this.library.songs) {
			if (song.title === newSong.title) {
				exists = true;
				break;
			}
		}
		if (!exists) this.library.songs.push(newSong);
		else return null // should let the user know the song is already in the db
		console.log('LIBRARY CONTROLLER - this.library.songs after adding song:', this.library.songs);
	}
}

module.exports = LibraryController;
