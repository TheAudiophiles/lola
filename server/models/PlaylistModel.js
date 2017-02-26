const mongoose = require('mongoose');

var PlaylistSchema = new mongooose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false,
    unique: false
  }
  songs: {
    type: [SongsSchema],
    required: false,
    unique: false
  },
  user: {
    type: Schema.ObjectId,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
