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

router.get('/api/lyrics-search/:lyrics', isAuth, (req, res) => {
  const { lyrics } = req.params;
  const LYRICS_ROOT_URL = 'https://api.musixmatch.com/ws/1.1/track.search';
  const LYRICS_STATIC_OPTS = 'page_size=10&page=1&s_track_rating=desc';
  const lyricsOpts = `&apikey=${MUSIXMATCH_API_KEY}&q_lyrics=${lyrics}`;
  const lyricsUrl = `${LYRICS_ROOT_URL}?${LYRICS_STATIC_OPTS}${lyricsOpts}`;

  const YOUTUBE_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
  const YOUTUBE_STATIC_OPTS = 'part=id&maxResults=1&order=relevance';

  let results = [];
  let srYT = [];
  let srSP
  let youtubeOpts = '';

  axios.get(lyricsUrl)
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
      console.log('PRIMARY RESULT:', uniqueResultsYT[0]);

      let otherResultsYT = searchResultsYT.slice(1);
      let otherResultsSP = searchResultsSP.slice(1);

      for (let i = 0; i < otherResultsYT.length; i++) {
        let minSimilarity = 0;
        for (let j = 0; j < uniqueResultsYT.length; j++) {
          // console.log('term2:', term2);
          let similarity = stringSimilarity.compareTwoStrings(otherResultsYT[i], uniqueResultsYT[j]);
          console.log(`similarity between ${otherResultsYT[i]} and ${uniqueResultsYT[j]} is ${similarity}`);
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
      console.log('srYT', srYT);
      srSP = uniqueResultsSP.slice(0,4);
      console.log('srSP', srSP);
    })
    // .then(sr => {
    //   console.log('starting searches for associated youtube videos :D');
    //   const YOUTUBE_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
    //   const YOUTUBE_STATIC_OPTS = 'part=id&maxResults=1&order=relevance';
    //   // console.log('YT STUFF:', youtubeOpts);
    //   vids = sr.map((song) => {
    //     const youtubeOpts = `&q=${song}&key=${YOUTUBE_API_KEY}`;
    //     return () => axios.get(`${YOUTUBE_ROOT_URL}?${YOUTUBE_STATIC_OPTS}${youtubeOpts}`); // have to be wrapped, else requests are invoked
    //   });
    //   console.log('VIDS:', vids);
    //   // return axios.get(youtubeUrl);
    //   return axios.all([vids[0](), vids[1](), vids[2](), vids[3]()]);
    // })
    .then(() => {
      console.log('REQUESTING ASSOCIATED YOUTUBE VIDEOS :)');
      youtubeOpts = `&q=${srYT[0]}&key=${YOUTUBE_API_KEY}`;
      return axios.get(`${YOUTUBE_ROOT_URL}?${YOUTUBE_STATIC_OPTS}${youtubeOpts}`);
    })
    .then((vid0) => { // guaranteed to get vid0, the primary search result
      // console.log('VID0:', vid0.data);
      results.push({ vid: vid0.data });
      if (srYT[1]) { // if there is another vid we can search for...DO IT. Otherwise, return undefined
        youtubeOpts = `&q=${srYT[1]}&key=${YOUTUBE_API_KEY}`;
        return axios.get(`${YOUTUBE_ROOT_URL}?${YOUTUBE_STATIC_OPTS}${youtubeOpts}`);
      }
    })
    .then((vid1) => {
      if (vid1) { // only do this stuff if undefined wasn't returned
        // console.log('VID1:', vid1.data);
        results.push({ vid: vid1.data });
        youtubeOpts = `&q=${srYT[2]}&key=${YOUTUBE_API_KEY}`;
        return axios.get(`${YOUTUBE_ROOT_URL}?${YOUTUBE_STATIC_OPTS}${youtubeOpts}`);
      }
    })
    .then((vid2) => {
      if (vid2) {
        // console.log('VID2:', vid2.data);
        results.push({ vid: vid2.data });
        youtubeOpts = `&q=${srYT[3]}&key=${YOUTUBE_API_KEY}`;
        return axios.get(`${YOUTUBE_ROOT_URL}?${YOUTUBE_STATIC_OPTS}${youtubeOpts}`);
      }
    })
    .then((vid3) => {
      if (vid3) {
        // console.log('VID3:', vid3.data);
        results.push({ vid: vid3.data });
      }
      console.log('DONE GETTING YT DATA!!!:', results.ytData);
      console.log('NOW GETTING SPOTIFY DATA :P');
      console.log('SP SR:', srSP);
      console.log('ABOUT TO GET SPOT DATA FOR 1ST RESULT:', srSP[0]);
      return spotifyApi.searchTracks(srSP[0]); // there will always be one song
    })
    .then(data => {
      // console.log('DETAILS0:', data.body.tracks.items[0]);
      results[0].details = data.body.tracks.items[0];
      if (!srSP[1]) res.json(results); // we've got the vid and details data we need, let's scadattle
      console.log('ABOUT TO GET SPOT DATA FOR 2ND RESULT:', srSP[1]);
      return spotifyApi.searchTracks(srSP[1]);
    })
    .then(data => {
      // console.log('DETAILS1:', data.body.tracks.items[0]);
      // results.spotData.song2 = data.body.tracks.items[0];
      results[1].details = data.body.tracks.items[0];
      if (!srSP[2]) res.json(results);
      return spotifyApi.searchTracks(srSP[2]);
    })
    .then(data => {
      // console.log('DETAILS3:', data.body.tracks.items[0]);
      // results.spotData.song3 = data.body.tracks.items[0];
      results[2].details = data.body.tracks.items[0];
      if (!srSP[3]) res.json(results);
      return spotifyApi.searchTracks(srSP[3]);
    })
    .then(data => {
      // console.log('DETAILS4:', data.body.tracks.items[0]);
      // results.spotData.song4 = data.body.tracks.items[0];
      results[3].details = data.body.tracks.items[0];
      console.log('RESULTS:', results);
      res.json(results);
    })
    .catch(err => {
      res.json({ failed: true });
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();
  res.redirect('https://spotify.com/logout');
});

module.exports = router;
