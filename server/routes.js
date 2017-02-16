'use strict'
console.log('Got to the top of the page')
const Spotify = require('spotify-web-api-node');
//const passport = require('passport');
const https = require('https');
const querystring = require('querystring');
const express = require('express');
const router = new express.Router();

const User = require ('./models/UserModel');
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
  redirectUri: 'http://localhost:3000/callback'
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

router.get('/callback', (req, res, done) => {
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
        // userController.addUser({
        //   username: body.id,
        //   name: body.display_name || '',
        //   email: body.email || ''
        // }, (err, user) => {
        //   if (err) {
        //     //res.redirect('/#/error/failed to create user');
        //     console.log('There has been an error:', err);
        //   // } else {
        //   //   res.redirect(`/#/home/${access_token}/${refresh_token}`);
        //   }
        // });
        User.findOne({
          'username': body.id
        }, function (err, user){
          if(err){
            console.log('There has been an error creating the user:', user);
          } if(!user){
            user = new User({
              username: body.id || '',
              name: body.display_name || '',
              email: body.email || ''
            })
            user.save(function(err){
              if(err){
                console.log('There has been an error saving the user', err);
                return done(null, user);
              }
              console.log('The user has been saved');
            })
          } else {
            res.redirect(`/#/home/${access_token}/${refresh_token}`); 
            console.log('User has been logged in:', body.display_name); 
            //return done(err, user);
          }
        })
      });
      // we can also pass the token to the browser to make requests from there
    }).catch(err => {
     res.redirect('/#/error/invalid token');
    });
  }
});

router.get('/api/youtube-search/:song', (req, res0) => {
  const { song } = req.params;
  const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
  const STATIC_OPTS = 'part=snippet&maxResults=1&order=relevance';
  const opts = `&q=${song}&key=${YOUTUBE_API_KEY}`;
  const url = `${ROOT_URL}?${STATIC_OPTS}${opts}`;

  https.get(url, res1 => {
    res1.on('data', data => {
      res0.send(data.toString());
    });
  }).on('error', e => {
    console.log(e);
  });
});

router.get('/api/lyrics-search/:lyrics', (req, res0) => {
  const { lyrics } = req.params;
  const ROOT_URL = 'https://api.musixmatch.com/ws/1.1/track.search';
  const STATIC_OPTS = 'page_size=3&page=1&s_track_rating=desc';
  const opts = `&apikey=${MUSIXMATCH_API_KEY}&q_lyrics=${lyrics}`;
  const url = `${ROOT_URL}?${STATIC_OPTS}${opts}`;

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
    });
  }).on('error', e => {
    console.log(e);
  });
});



router.get('/logout', () => {

})


module.exports = router;
