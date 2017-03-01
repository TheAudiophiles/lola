const User = require('../models/UserModel');

class UserController {
  constructor() {
    this.user = {};
  }

  findById(id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  }

  findUser(username, done) {
    User.findOne({ username }, (err, user) => {
      if (err) {
        done(err);
      } else {
        this.user = user;
        done(null, user);
      }
    });
  }

  createUser(data, done) {
    this.user = new User({
      username: data.id,
      name: data.display_name || '',
      email: data.email || ''
    });
    this.user.save(err => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  }

  getUserId() {
    // console.log('GETTING USERID - this.user._id:', this.user._id);
    return this.user._id;
  }

}

module.exports = UserController;
