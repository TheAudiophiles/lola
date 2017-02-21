'use strict';

const Spotify = require('spotify-web-api-node');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
const router = new express.Router();

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
  (Math.random()
    .toString(36) + Array(N)
    .join('0'))
  .slice(2, N + 2);

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

router.get('/callback', (req, res) => {
  const {
    code,
    state
  } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
    // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code)
      .then(data => {
        const {
          expires_in,
          access_token,
          refresh_token
        } = data.body;
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        // use the access token to access the Spotify Web API
        spotifyApi.getMe()
          .then(({
            body
          }) => {

            userController.findUser(body.id, (err, user) => {
              if (err) {
                return console.log(err);
              }
              if (!user) {
                userController.createUser(body, err => {
                  if (err) {
                    return console.log(err);
                  }
                  console.log('User saved');
                });
              }

              req.session.loggedIn = true;
              res.redirect(`/#/user/${access_token}/${refresh_token}`);
            });
          });
      })
      .catch(err => {
        res.redirect('/#/error/invalid token');
      });
  }
});

router.get('/api/lyrics-search/:lyrics', isAuth, (req, res) => {
  const { lyrics } = req.params;
  const LYRICS_ROOT_URL = 'https://api.musixmatch.com/ws/1.1/track.search';
  const LYRICS_STATIC_OPTS = 'page_size=3&page=1&s_track_rating=desc';
  const lyricsOpts = `&apikey=${MUSIXMATCH_API_KEY}&q_lyrics=${lyrics}`;
  const lyricsUrl = `${LYRICS_ROOT_URL}?${LYRICS_STATIC_OPTS}${lyricsOpts}`;

  const YOUTUBE_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
  const YOUTUBE_STATIC_OPTS = 'part=snippet&maxResults=1&order=relevance';

  let results = {};
  let trackName = '', artistName = '';

  axios.get(lyricsUrl)
    .then(({ data }) => {
      const { track_name, artist_name } = data.message.body.track_list[0].track;
      trackName = track_name;
      artistName = artist_name;
      return `${artist_name} ${track_name}`;
    })
    .then(track => {
      const youtubeOpts = `&q=${track}&key=${YOUTUBE_API_KEY}`;
      const youtubeUrl = `${YOUTUBE_ROOT_URL}?${YOUTUBE_STATIC_OPTS}${youtubeOpts}`;
      return axios.get(youtubeUrl);
    })
    .then(({ data }) => {
      results.ytData = data;
      return spotifyApi.searchTracks(`track:${trackName} artist:${artistName}`);
    })
    .then(data => {
      results.spotData = data.body.tracks.items[0];
      res.json(results);
    })
    .catch(err => {
      res.redirect('/#/error/There was a problem with the search');
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();
  res.redirect('https://spotify.com/logout');
});

module.exports = router;
