'use strict';

const Spotify = require('spotify-web-api-node');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
const router = new express.Router();
const stringSimilarity = require('string-similarity');

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

const generateRandomString = N => (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

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

// function isSameSong(a, b) {
//   if (a === b)) {
//     return true;
//   }
//   return false;
// }

function youtubeSearch(query) {
  if (query) {
    const YOUTUBE_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
    const YOUTUBE_STATIC_OPTS = 'part=id&maxResults=1&order=relevance';
    const youtubeOpts = `&q=${query}&key=${YOUTUBE_API_KEY}`;

    return axios.get(`${YOUTUBE_ROOT_URL}?${YOUTUBE_STATIC_OPTS}${youtubeOpts}`);
  }
}

function trackSearch(options, res) {
  const TRACK_ROOT_URL = 'https://api.musixmatch.com/ws/1.1/track.search';
  const TRACK_STATIC_OPTS = 'page_size=10&page=1&s_track_rating=desc';
  let trackOpts = `&apikey=${MUSIXMATCH_API_KEY}${options}`;
  const trackUrl = `${TRACK_ROOT_URL}?${TRACK_STATIC_OPTS}${trackOpts}`;

  let results = [];
  let srYT = [];
  let srSP
  let youtubeOpts = '';

  axios.get(trackUrl)
    .then(({ data }) => {
      let searchResultsYT = [];
      let searchResultsSP = [];

      data.message.body.track_list.forEach((result) => {
        searchResultsYT.push(`${result.track.artist_name} ${result.track.track_name}`);
        searchResultsSP.push(`track:${result.track.track_name} artist:${result.track.artist_name}`);
      });

      console.log('searchResultsYT:', searchResultsYT);
      console.log('searchResultsSP:', searchResultsSP);

      let uniqueResultsYT = [];
      uniqueResultsYT.push(searchResultsYT[0]);
      let uniqueResultsSP = [];
      uniqueResultsSP.push(searchResultsSP[0]);

      let otherResultsYT = searchResultsYT.slice(1);
      let otherResultsSP = searchResultsSP.slice(1);

      for (let i = 0; i < otherResultsYT.length; i++) {
        let minSimilarity = 0;
        for (let j = 0; j < uniqueResultsYT.length; j++) {
          let similarity = stringSimilarity.compareTwoStrings(otherResultsYT[i], uniqueResultsYT[j]);
          // console.log(`similarity between ${otherResultsYT[i]} and ${uniqueResultsYT[j]} is ${similarity}`);
          if (similarity > minSimilarity ) {
            minSimilarity = similarity;
          }
        }
        console.log('MIN SIMILARITY:', minSimilarity);
        if (minSimilarity <= 0.3) { // its all good
          uniqueResultsYT.push(otherResultsYT[i]);
          uniqueResultsSP.push(otherResultsSP[i]);
        }
      }

      srYT = uniqueResultsYT.slice(0,4);
      srSP = uniqueResultsSP.slice(0,4);
      console.log('srSP', srSP);
    })

    .then(() => {
      return youtubeSearch(srYT[0]);
    })
    .then((vid0) => { // guaranteed to get vid0, the primary search result
      results.push({ vid: vid0.data });
      return youtubeSearch(srYT[1]);
    })
    .then((vid1) => {
      if (vid1) results.push({ vid: vid1.data });
      return youtubeSearch(srYT[2]);
    })
    .then((vid2) => {
      if (vid2) results.push({ vid: vid2.data });
      return youtubeSearch(srYT[3]);
    })
    .then((vid3) => {
      if (vid3) results.push({ vid: vid3.data });
      return spotifyApi.searchTracks(srSP[0]); // there will always be one song
    })
    .then(data => {
      results[0].details = data.body.tracks.items[0];
      if (srSP[1]) return spotifyApi.searchTracks(srSP[1]);
    })
    .then(data => {
      if (data) results[1].details = data.body.tracks.items[0];
      if (srSP[2]) return spotifyApi.searchTracks(srSP[2]);
    })
    .then(data => {
      if (data) results[2].details = data.body.tracks.items[0];
      if (srSP[3]) return spotifyApi.searchTracks(srSP[3]);
    })
    .then(data => {
      if (data) results[3].details = data.body.tracks.items[0];
      res.json(results);
    })
    .catch(err => {
      res.json({ failed: true });
    });
}

router.get('/api/lyrics-search/:lyrics/:artist', isAuth, (req, res) => {
  const { lyrics, artist } = req.params;
  let lyricsOpts = `&q_lyrics=${lyrics}`;
  if (artist !== 'null') lyricsOpts += `&q_artist=${artist}`;
  trackSearch(lyricsOpts, res);
});

router.get('/api/song-search/:song/:artist', (req, res) => {
  const { song, artist } = req.params;
  let songOpts = `&q_track=${song}`;
  if (artist !== 'null') songOpts += `&q_artist=${artist}`;
  trackSearch(songOpts, res);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();
  res.redirect('https://spotify.com/logout');
});

module.exports = router;
