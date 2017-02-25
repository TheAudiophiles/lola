const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
  songs: [SongsSchema],
  user: Schema.ObjectId
});

module.exports = mongoose.model('Library', LibrarySchema);
