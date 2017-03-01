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
    console.log('LIBRARY CONTROLLER - this.library before adding song:', this.library);
    let exists = false;
    for (let song of this.library.songs) {
      if (song.title === newSong.title) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      console.log(newSong.title, 'hasn\'t been added to the library yet');
      this.library.songs.push(newSong);
      this.library.save(err => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    } else {
      // 	should let the user know the song is already in the db!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log('LIBRARY CONTROLLER - this.library after adding song:', this.library);
      done();
    }
  }
}

module.exports = LibraryController;
