const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false,
    unique: false
  },
  email: {
    type: String,
    required: false,
    unique: false
  }
});

module.exports = mongoose.model('Users', UserSchema);
