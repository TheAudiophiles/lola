const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SpotifyStrategy = require('passport-spotify').Strategy;

const { clientID, clientSecret } = require('./config/spotify.conf');
const UserController = require('./controllers/UserController');
const userController = new UserController();

module.exports = (app) => {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // deserializeUser is how to get the hashed data back when you need it.
  passport.deserializeUser(function(id, done) {
    userController.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new SpotifyStrategy({
    clientID,
    clientSecret,
    callbackURL: 'http://localhost:8080/auth/spotify/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log('Access Token:', accessToken);
    userController.addUser({
      username: profile.username,
      name: profile.displayName || '',
      email: profile.email || ''
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  }));

  app.use(cookieParser());
  app.use(session({
    secret: 'lolaappsomethinghere',
    saveUninitialized: true,
    resave: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};
