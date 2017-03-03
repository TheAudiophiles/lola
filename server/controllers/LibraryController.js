const Library = require('../models/LibraryModel');

class LibraryController {
  constructor() {
    this.library = {};
  }
  // findSongByNameandArtist
  // findSongsByArtist
  // findSongsByAlbum

  getAll(user, done) {
    Library.findOne({ user }, (err, library) => {
      if (err) {
        console.log('LIBRARYCONTROLLER. GETALL - an error occurred while attempting to find get songs from library for user,', user);
        done(err);
      } else {
        console.log('LIBRARYCONTROLLER - successfully retrieved songs from library for user,', user);
        this.library = library;
        done(null, this.library.songs);
      }
    });
  }

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
        console.log('LIBRARYCONTROLLER - an error occurred while attempting to find library for user,', user);
        done(err);
      } else {
        console.log('LIBRARYCONTROLLER - found library for user,', user);
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
          console.log('LIBRARY CONTROLLER - this.library after adding song:', this.library);
          done(false);
        }
      });
    } else { // song is already in library
      // 	should let the user know the song is already in the db!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      done(true);
    }
  }

  removeSong(target, done) {
    console.log('LIBRARYCONTROLLER. REMOVESONG - library before removing song:', this.library);
    for (let i = 0; i < this.library.songs.length; i++) {
      if (this.library.songs[i].title === target.title && this.library.songs[i].videoId === target.videoId) {
        let deletedSong = this.library.songs.splice(i, 1)[0];
        console.log('LIBRARYCONTROLLER. REMOVESONG - library after removing song:', this.library);
        this.library.save(err => {
          if (err) {
            done(err);
          } else {
            done(null, deletedSong);
          }
        })
      }
    }
    // CURRENTLY NOT HANDLING THE CASE WHERE WE TRY TO REMOVE A SONG THAT ISNT IN THE LIBRARY. these 2 lines shouldn't never get run
    // console.log('LIBRARYCONTROLLER - target song does not exist in the library');
    // done();
  }
}

module.exports = LibraryController;
