const User = require('../models/UserModel');

class UserController {
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
				done(null, user);
			}
		});
	}

	createUser(data, done) {
		const user = new User({
			username: data.id,
			name: data.display_name || '',
			email: data.email || ''
		});
		user.save(err => {
			if (err) {
				done(err);
			} else {
				done();
			}
		});
	}

}

module.exports = UserController;
