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

		console.log('SONGCONTROLLER. FINDONE QUERY FOR SONG IN LIBRARY');
		Song.findOne({ title, artist }, (err, found) => {
			if (err) {
				console.log(err);
			}
			if (!found) {
				console.log('SONGCONTROLLER. FINDONE QUERY. SONG IS NOT IN LIBRARY - song:', song);
				song.save(err => {
					if (err) {
						done(err);
					} else {
						done();
					}
				});
			}
		});
		console.log('SONGCONTROLLER. OUTSIDE OF FINDONE QUERY. RETURNING song:', song);
		console.log('Done: ', done);
		// return song;
		done(null, song);
	}
}

module.exports = SongController;
