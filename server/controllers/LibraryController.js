const Library = require('../models/LibraryModel');

class LibraryController {
  constructor() {
    this.library = {};
  }

  getAll(user, done) {
    Library.findOne({ user }, (err, library) => {
      if (err) {
        done(err);
      } else {
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
        done(err);
      } else {
        this.library = library;
        done(null, library);
      }
    });
  }

  addSong(newSong, done) {
    let exists = false;
    for (let song of this.library.songs) {
      if (song.title === newSong.title) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      this.library.songs.push(newSong);
      this.library.save(err => {
        if (err) {
          done(err);
        } else {
          done(null, false);
        }
      });
    } else { // song is already in library

      done(null, true);
    }
  }

  removeSong(target, done) {
    for (let i = 0; i < this.library.songs.length; i++) {
      const song = this.library.songs[i];

      if (song.title === target.title && song.videoId === target.videoId) {
        let deletedSong = this.library.songs.splice(i, 1)[0];

        this.library.save(err => {
          if (err) {
            done(err);
          } else {
            done(null, deletedSong);
          }
        });
      }
    }
  }
}

module.exports = LibraryController;
