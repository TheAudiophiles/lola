'use strict';

const Spotify = require('spotify-web-api-node');
const https = require('https');
const querystring = require('querystring');
const express = require('express');
const router = new express.Router();

const User = require('./models/UserModel');
const UserController = require('./controllers/UserController');
const userController = new UserController();

const SPOTIFY_API_KEY = require('./config/spotify.conf');
const YOUTUBE_API_KEY = require('./config/youtube.conf');
const MUSIXMATCH_API_KEY = require('./config/musixmatch.conf');

const STATE_KEY = 'spotify_auth_state';
const scopes = ['user-read-private', 'user-read-email'];

const spotifyApi = new Spotify({
  clientId: SPOTIFY_API_KEY.clientID,
  clientSecret: SPOTIFY_API_KEY.clientSecret,
  redirectUri: 'http://localhost:3000/callback'
});

const generateRandomString = N =>
  (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

/**
 * Middleware to check if user is logged in before
 * allowing access to route
 *
 * @return {Function} go to callback function for route
 *                    or redirect to login component
 */
const isAuth = (req, res, next) => {
  if (req.session.loggedIn && spotifyApi.getAccessToken()) {
    return next();
  }
  res.redirect('/');
};

const youtubeSearch = (song, cb) => {
  const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
  const STATIC_OPTS = 'part=snippet&maxResults=1&order=relevance';
  const opts = `&q=${song}&key=${YOUTUBE_API_KEY}`;
  const url = `${ROOT_URL}?${STATIC_OPTS}${opts}`;

  https.get(url, res1 => {
    res1.on('data', data => {
      cb(data);
    });
  }).on('error', e => {
    console.log(e);
  });
};
=======
const generateRandomString = N => (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);
>>>>>>> cleaned up routes

/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
router.get('/auth/spotify', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */

router.get('/callback', (req, res, done) => {
  //console.log('This is req:', req);
  // console.log('This is res:', res);
  const {
    code,
    state
  } = req.query;
  console.log('this is req.query:', req.query)
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
    // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const {
        expires_in,
        access_token,
        refresh_token
      } = data.body;
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {

        userController.findUser(body.id, (err, user) => {
          if (err) {
            return console.log(err);
          }
          if (!user) {
            userController.createUser(body, err => {
              if (err) {
                return console.log(err);
      spotifyApi.getMe().then(({
        body
      }) => {
        console.log('body:', body);

        User.findOne({
          'username': body.id
        }, function(err, user) {
          if (err) {
            console.log('There has been an error creating the user:', user);
          }
          if (!user) {
            user = new User({
              username: body.id || '',
              name: body.display_name || '',
              email: body.email || ''
            })
            user.save(function(err) {
              if (err) {
                console.log('There has been an error saving the user', err);
                return done(null, user);
              }
              console.log('User saved');
            });
          }

          req.session.loggedIn = true;
          res.redirect(`/#/user/${access_token}/${refresh_token}`);
        });
      });
    }).catch(err => {
      res.redirect('/#/error/invalid token');
    });
  }
});

router.get('/api/youtube-search/:song', isAuth, (req, res0) => {
  const { song } = req.params;
  const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
  const STATIC_OPTS = 'part=snippet&maxResults=1&order=rating';
  const opts = `&q=${song}&key=${YOUTUBE_API_KEY}`;
  const url = `${ROOT_URL}?${STATIC_OPTS}${opts}`;

  https.get(url, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk
    });
    res.on('end', () => {
      data = JSON.parse(data).items[0];
      console.log('DATA BEING SENT BACK FROM YOUTUBE:', data);
      cb(data);
    });
  }).on('error', e => {
    console.log(e);
  });
});

const spotifySearch = (songData, cb) => { // limit search results to 3 to limit bandwith
  spotifyApi.searchTracks(`${songData}`)
    .then(function(data) {
      console.log('DATA BEING SENT BACK FROM SPOTIFY:', data.body.tracks.items[0]);
      cb(data.body.tracks.items[0]);
    }, function(err) {
      console.error('something went wrong in song details', err);
    });
};

router.get('/api/lyrics-search/:lyrics', (req, res0) => {
  const {
    lyrics
  } = req.params;
  const ROOT_URL = 'https://api.musixmatch.com/ws/1.1/track.search';
  const STATIC_OPTS = 'page_size=3&page=1&s_track_rating=desc';
  const opts = `&apikey=${MUSIXMATCH_API_KEY}&q_lyrics=${lyrics}`;
  const url = `${ROOT_URL}?${STATIC_OPTS}${opts}`;

  https.get(url, res1 => {
    res1.setEncoding('utf8');
    res1.on('data', data => {
    let data = '';
    res1.on('data', chunk => {
      data += chunk
    });
    res1.on('end', () => {
      if (data && JSON.parse(data)) {
        const {
          track_name,
          artist_name
        } = JSON.parse(data).message.body.track_list[0].track;

        youtubeSearch(`${artist_name} ${track_name}`, (ytData) => {
          spotifySearch(`track:${track_name} artist:${artist_name}`, (spotData) => {
            const coupledData = {
              ytData,
              spotData
            };
            console.log('COUPLED DATA:', coupledData);
            res0.send(coupledData);
          });
          // res0.end(ytData.toString());
        });
      }
    });
  }).on('error', e => {
    console.log(e);
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();
  res.redirect('https://spotify.com/logout');
});

router.get('/logout', () => {

})

module.exports = router;
