const mongoose = require('mongoose');
const songSchema = require('./SongModel').schema;
const User = require('../models/UserModel');
const ObjectId = require('mongoose').Schema.ObjectId

const LibrarySchema = new mongoose.Schema({
  songs: [songSchema], // make these objectIds
  user: { type: ObjectId , ref: 'User' }
});

module.exports = mongoose.model('Library', LibrarySchema);
