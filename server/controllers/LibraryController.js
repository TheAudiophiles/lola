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
				console.log('LIBRARY CONTROLLER. RESULTS OF LIBRARY SEARCH FOR USER', user + ':');
				console.log('library', library);
				console.log('this.library', this.library);
				done(null, library);
			}
		});
  }

  addSong(newSong, done) {
		console.log('LIBRARY CONTROLLER - this.library before adding song:', this.library);
    let exists = false;
		for (let song of this.library.songs) {
			console.log(song.title, 'vs', newSong.title);
			if (song.title === newSong.title) {
				exists = true;
				break;
			}
		}
		if (!exists) {
			console.log(newSong.title, 'hasn\'t been added to the library yet');
			// this.library.songs = [...this.library.songs, newSong];
			this.library.songs.push(newSong);
			this.library.save(err => {
				if (err) {
					done(err);
				} else {
					done();
				}
			});
		}
		// 	else return null // should let the user know the song is already in the db
		console.log('LIBRARY CONTROLLER - this.library after adding song:', this.library);
	}
}

module.exports = LibraryController;
