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
    unique: false
  },
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false,
    unique: false
  },
  album: {
    type: String,
    required: false,
    unique: false
  }
});

exports.model = mongoose.model('Song', SongSchema);
exports.schema = SongSchema;
