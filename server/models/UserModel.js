const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

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



UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('Users', UserSchema);
