const mongoose = require('mongoose');
const songSchema = require('./SongModel').schema;

// const LibrarySchema = new mongoose.Schema({
//   songs: [{ type: Schema.ObjectId, ref: 'Song'}],
//   user: { type: Number, ref: 'User' }
// });

const LibrarySchema = new mongoose.Schema({
  songs: [songSchema],
  user: { type: Number, ref: 'User' }
});

module.exports = mongoose.model('Library', LibrarySchema);
