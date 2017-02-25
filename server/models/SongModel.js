const mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  // position: Number,
  title: {
    type: String,
    required: true,
    unique: true
  },
  artist: {
    type: String,
    required: true,
    unique: true
  },
  // artistGid: String,
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false,
    unique: true
  }
  album title: {
    type: String,
    required: true,
    unique: true
  }
  // albumGid: String
  // time: Number,
  // url: String,
  // gid: String,
  // location: String (either youtube, vimeo, soundcloud for now),
  // playlist: [Schema.ObjectId] // (array of object ids that point to playlists?)
});

module.exports = mongoose.model('Song', SongSchema);
