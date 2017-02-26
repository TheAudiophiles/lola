const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
  songs: {
    type: [SongsSchema],
    required: true,
    unique: true
  },
  user: {
    type: Schema.ObjectId,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Library', LibrarySchema);
