const Library = require('../models/LibraryModel');

class LibraryController {
  // constructor() {
  //   this.library = {};
  // }
	// findSongByNameandArtist
  // findSongsByArtist
  // findSongsByAlbum

	createLibrary(data, done) {
		this.library = new Library({
			user: this.user,
			songs: []
		});
		library.save(err => {
			if (err) {
				done(err);
			} else {
				done();
			}
		});
	}

  findLibrary(uid, done) {
    Library.findOne({ uid }, (err, user) => {
			if (err) {
				done(err);
			} else {
				done(null, library);
			}
		});
  }

  addSong(song, done) {
    Song.create({ song }, function(err, cb) {

    })
  }
}

module.exports = LibraryController;
