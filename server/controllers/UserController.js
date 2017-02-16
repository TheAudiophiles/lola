const User = require('../models/UserModel');

class UserController {
	addUser(user, done) {
	  User.findOrCreate(user, (err, user) => done(err, user));
	}

	findById(id, done) {
	  User.findById(id, (err, user) => {
	    done(err, user);
	  });
	}

	// addUser(user, done) {
	// 	console.log('fired addUser');
	// 	User.save(function(err){
	// 		if(err){
	// 			throw err;
	// 		}
	// 	})
	// }

	// findById(id, done) {
	// 	User.findById(id, (err, user) => {
	// 		if (err) throw err;
	// 		console.log('This is user:', user);
	// 	})
	// }

}

module.exports = UserController;