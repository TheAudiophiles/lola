'use strict'
console.log('Got to the top of the page')
const Spotify = require('spotify-web-api-node');
//const passport = require('passport');
const https = require('https');
const querystring = require('querystring');
const express = require('express');
const router = new express.Router();

const UserController = require('./controllers/UserController');
const userController = new UserController();

const SPOTIFY_API_KEY = require ('./config/spotify.conf');
const YOUTUBE_API_KEY = require('./config/youtube.conf');
const MUSIXMATCH_API_KEY = require('./config/musixmatch.conf');

const STATE_KEY = 'spotify_auth_state';

const scopes = ['user-read-private', 'user-read-email'];

const spotifyApi = new Spotify({
  clientId: SPOTIFY_API_KEY.clientID,
  clientSecret: SPOTIFY_API_KEY.clientSecret,
  redirectUri: 'http://localhost:8080/callback'
});

console.log('Got here too')

const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

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
  //console.log('This is req:', req);
  // console.log('This is res:', res);
  const { code, state } = req.query;
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
      const { expires_in, access_token, refresh_token } = data.body;
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      console.log('called set access token');
      spotifyApi.setRefreshToken(refresh_token);
      console.log('called set refresh token');
      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {
        console.log('Calling helper getMe');
        console.log('body:', body);

      });
      // we can also pass the token to the browser to make requests from there
      res.redirect(`/#/user/${access_token}/${refresh_token}`);
    }).catch(err => {
      res.redirect('/#/error/invalid token');
    });
  };
});  
 https.get(url, res1 => {
      res1.setEncoding('utf8');
      res1.on('data', data => {
        if (JSON.parse(data)) {
          const {
            track_name,
            artist_name
          } = JSON.parse(data).message.body.track_list[0].track;
          res0.redirect(`/api/youtube-search/${artist_name} ${track_name}`);
        }
      })
    })    

module.exports = router;