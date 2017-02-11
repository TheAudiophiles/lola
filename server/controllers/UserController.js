const User = require('../models/UserModel.js');

class UserController {
  addUser(user, done) {
    User.findOrCreate(user, (err, user) => done(err, user));
  }

  findById(id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  }
}

module.exports = UserController;
