const mongoose = require('mongoose');

var PlaylistSchema = new mongooose.Schema({
  title: String,
  description: String,
  user: Schema.ObjectId
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
