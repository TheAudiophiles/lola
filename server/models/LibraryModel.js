const mongoose = require('mongoose');
const songSchema = require('./SongModel').schema;
const User = require('../models/UserModel');
const ObjectId = require('mongoose').Schema.ObjectId

// const LibrarySchema = new mongoose.Schema({
//   songs: [{type: ObjectId, ref: 'Song'}],
//   user: { type: Number, ref: 'User' }
// });

const LibrarySchema = new mongoose.Schema({
  songs: [songSchema], // makes these objectIds
  user: { type: ObjectId , ref: 'User' }
});

module.exports = mongoose.model('Library', LibrarySchema);
