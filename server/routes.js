'use strict';

const Spotify = require('spotify-web-api-node');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
const router = new express.Router();
const stringSimilarity = require('string-similarity');

const UserController = require('./controllers/UserController');
const userController = new UserController();
const LibraryController = require('./controllers/LibraryController');
const libraryController = new LibraryController();
const SongController = require('./controllers/SongController');
const songController = new SongController();

const SPOTIFY_API_KEY = require('./config/spotify.conf');
const YOUTUBE_API_KEY = require('./config/youtube.conf');
const MUSIXMATCH_API_KEY = require('./config/musixmatch.conf');

const STATE_KEY = 'spotify_auth_state';
const scopes = ['user-read-private', 'user-read-email'];

const spotifyApi = new Spotify({
  clientId: SPOTIFY_API_KEY.clientID,
  clientSecret: SPOTIFY_API_KEY.clientSecret,
  redirectUri: SPOTIFY_API_KEY.callbackUrl
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
  const TRACK_STATIC_OPTS = 'page_size=10&page=1&s_track_rating=desc&quorum_factor=0.9';
  let trackOpts = `&apikey=${MUSIXMATCH_API_KEY}${options}`;
  const trackUrl = `${TRACK_ROOT_URL}?${TRACK_STATIC_OPTS}${trackOpts}`;

  let results = [];
  let srYT = [];
  let srSP = [];
  let tracks = [];
  let youtubeOpts = '';

  axios.get(trackUrl)
    .then(({ data }) => {
      let searchResultsYT = [];
      let searchResultsSP = [];

      data.message.body.track_list.forEach((result) => {
        searchResultsYT.push(`${result.track.artist_name} ${result.track.track_name}`);
        searchResultsSP.push(`track:${result.track.track_name} artist:${result.track.artist_name}`);
        tracks.push({ name: result.track.track_name, artist: result.track.artist_name });
      });

      // console.log('searchResultsYT:', searchResultsYT);
      // console.log('searchResultsSP:', searchResultsSP);
      // console.log('tracks:', tracks);

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
        // console.log('MIN SIMILARITY:', minSimilarity);
        if (minSimilarity <= 0.3) { // its all good
          uniqueResultsYT.push(otherResultsYT[i]);
          uniqueResultsSP.push(otherResultsSP[i]);
        }
      }

      srYT = uniqueResultsYT.slice(0,4);
      srSP = uniqueResultsSP.slice(0,4);
      // console.log('srSP', srSP);
    })

    .then(() => {
      return youtubeSearch(srYT[0]);
    })
    .then((vid0) => { // guaranteed to get vid0, the primary search result
      results.push({ vid: vid0.data, track: tracks[0] });
      return youtubeSearch(srYT[1]);
    })
    .then((vid1) => {
      if (vid1) results.push({ vid: vid1.data, track: tracks[1] });
      return youtubeSearch(srYT[2]);
    })
    .then((vid2) => {
      if (vid2) results.push({ vid: vid2.data, track: tracks[2] });
      return youtubeSearch(srYT[3]);
    })
    .then((vid3) => {
      if (vid3) results.push({ vid: vid3.data, track: tracks[3] });
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

router.get('/api/lyrics-search/:lyrics/:artist', (req, res) => {
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
  userController.user = {};
  res.redirect('https://spotify.com/logout');
});

router.post('/addToLibrary', (req, res) => {
  console.log('ROUTE /ADDTOLIBRARY ()====={@)=========================================>');
  let songData = req.body;
  songController.createSong(songData, (err, song) => {
    if (err) {
      return console.log(err);
    }
    console.log('ROUTE /ADDTOLIBRARY - song returned from SONGCONTROLLER:', song);
    let userId = userController.getUserId();

    libraryController.findLibrary(userId, (err, library) => {
      if (err) {
        return console.log(err);
      }
      if (!library) {
        libraryController.createLibrary(userId, err => {
          if (err) {
            return console.log(err);
          }
          console.log('ROUTE /ADDTOLIBRARY. no library for user', userId + '. new library created');
          libraryController.addSong(song, (err, exists) => {
            if (err) {
              return console.log(err);
            }
            if (!exists) {
              console.log('ROUTE /ADDTOLIBRARY. returning song after adding it to library:', song);
              res.json(song);
            } else {
              console.log('ROUTE /ADDTOLIBRARY. song already exists in the library:', song);
              res.json(null);
            }
          });
        });
      } else { // library already exists, just add the song
        console.log('ROUTE /ADDTOLIBRARY. library for user', userId, 'found');
        libraryController.addSong(song, (err, exists) => {
          if (err) {
            return console.log(err);
          }
          if (!exists) {
            console.log('ROUTE /ADDTOLIBRARY. returning song after adding it to library:', song);
            res.json(song);
          } else {
            console.log('ROUTE /ADDTOLIBRARY. song already exists in the library:', song);
            res.json(null);
          }
        });
      }
    });
  });
});

router.post('/removeFromLibrary', (req, res) => {
  console.log('ROUTE /REMOVEFROMLIBRARY ()====={@)=========================================>');
  let song = req.body;
  console.log('ROUTE /REMOVEFROMLIBRARY - trying to remove song:', song);

  libraryController.removeSong(song, (err, deletedSong) => {
    if (err) {
      console.error(err);
    }
    console.log('ROUTE /REMOVEFROMLIBRARY. returning deleted song:', deletedSong);
    res.json(deletedSong);
  });
});

router.get('/fetchLibrary', (req, res) => {
  console.log('ROUTE /fetchLibrary ()====={@)=========================================>');
  let userId = userController.getUserId();
  libraryController.findLibrary(userId, (err, library) => {
    if (err) {
      return console.error(err);
    }
    if (!library) {
      console.log('ROUTE /fetchLibrary. library for user', userId, ' NOT found');
      res.end();
    } else {
      console.log('ROUTE /fetchLibrary. library for user', userId, 'found');
      libraryController.getAll(userId, (err, librarySongs) => {
        if (err) {
          return console.log(err);
        }
        console.log('ROUTE /fetchLibrary. returning songs from library:', librarySongs);
        res.json(librarySongs);
      });
    }
  });
});

module.exports = router;
