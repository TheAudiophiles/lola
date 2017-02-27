const mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
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
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false,
    unique: true
  },
  album: {
    type: String,
    required: true,
    unique: true
  }
});

exports.model = mongoose.model('Song', SongSchema);
exports.schema = SongSchema;
