const Song = require('../models/SongModel').model;

class SongController {
  createSong(data, done) {

    let image, artist, album, title, videoId;
    videoId = data.vid.items[0].id.videoId;
    if (data.details) {
      image = data.details.album.images[0].url;
      artist = data.details.artists[0].name;
      album = data.details.album.name;
      title = data.details.name;
    } else if (data.track) {
      title = data.track.name;
      artist = data.track.artist;
    }

    let song = new Song({
      title: title,
      artist: artist,
      videoId: videoId,
      image: image,
      album: album
    });

    // console.log('SONGCONTROLLER. FINDONE QUERY FOR SONG IN LIBRARY');
    Song.findOne({ title, artist }, (err, found) => {
      if (err) {
        console.log(err);
      }
      if (!found) {
        console.log('SONGCONTROLLER. song is not in the song collection');
        song.save(err => {
          if (err) {
            done(err);
          } else {
            console.log('SONGCONTROLLER. finished creating song. returning it now:', song);
            done(null, song); // returning undefined which is being used for everything on routes. NOT GOOD
          }
        });
      } else { // song was already in the collection. no need to save
        console.log('SONGCONTROLLER. finished creating song. returning it now:', song);
        done(null, song);
      }
    });
  }
}

module.exports = SongController;
