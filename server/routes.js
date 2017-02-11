const passport = require('passport');
const userController = require('./controllers/userController');

module.exports = (app) => {
  app.get('/auth/spotify',
    passport.authenticate('spotify'),
    // this function doesn't get called
    // callback gets called on successful login
    (req, res) => {}
  );

  app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res) => {
      req.session.user = req.session.passport.user;
      res.cookie('loggedIn', true);
      res.redirect('/');
    }
  );
};
