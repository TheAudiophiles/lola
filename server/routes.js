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
const { YOUTUBE_URL, YOUTUBE_API_KEY } = require('./config/youtube.conf');
const { MUSIXMATCH_URL, MUSIXMATCH_API_KEY } = require('./config/musixmatch.conf');

const STATE_KEY = 'spotify_auth_state';
const scopes = ['user-read-private', 'user-read-email'];

// add 2.5 sec timeout to axios
axios.defaults.timeout = 2500;

const spotifyApi = new Spotify({
  clientId: SPOTIFY_API_KEY.clientID,
  clientSecret: SPOTIFY_API_KEY.clientSecret,
  redirectUri: SPOTIFY_API_KEY.callbackUrl
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

/**
 * youtubeSearch - call to youtube API search endpoint
 *
 * @param {string} query
 * @return {Promise} axios promise for ajax request
 */
function youtubeSearch(query) {
  // if (query) {
    const YOUTUBE_STATIC_OPTS = 'part=id&maxResults=1&order=relevance&type=video';
    const youtubeOpts = `&q=${query}&key=${YOUTUBE_API_KEY}`;
    const youtubeSearchUrl = `${YOUTUBE_URL}?${YOUTUBE_STATIC_OPTS}${youtubeOpts}`;

    return axios.get(youtubeSearchUrl);
  // }
}

/**
 * musixmatchSearch - call to musixmatch API search endpoint
 *
 * @param {string} query
 * @return {Promise} axios promise for ajax request
 */
function musixmatchSearch(options) {
  const TRACK_STATIC_OPTS = 'page_size=20&page=1&s_track_rating=desc&quorum_factor=0.9';
  let trackOpts = `&apikey=${MUSIXMATCH_API_KEY}${options}`;
  const trackUrl = `${MUSIXMATCH_URL}?${TRACK_STATIC_OPTS}${trackOpts}`;

  return axios.get(trackUrl);
}

/**
 * getAllSongs - promise chain, state, and handler for lyrics-search
 * and song-search. Makes call to musixmatch to get search results,
 * stores the most unique songs, then uses those to make calls to
 * youtube and spotify simultaneously for up to 4 songs (max unique
 * songs). If it fails at any point and there are results, it sends
 * the results to the client.
 *
 * @param {object} options for musixmatch
 * @param {object} res node http response stream
 */
function getAllSongs(options, res) {
  let results = [];
  let resultsYoutube = [];
  let resultsSpotify = [];
  let tracks = [];

  // closure function for getting making parallel ajax requests
  // to get youtube video data and spotify data for up to 2
  // songs at a time. Check if both have search strings before ajax
  function songDetailsAndVideo(i, j) {
    if (resultsYoutube[i] && resultsSpotify[i]) {
      const songOneRequests = [
        youtubeSearch(resultsYoutube[i]),
        spotifyApi.searchTracks(resultsSpotify[i])
      ];
      if (resultsYoutube[j] && resultsSpotify[j]) {
        return axios.all([
          ...songOneRequests,
          youtubeSearch(resultsYoutube[j]),
          spotifyApi.searchTracks(resultsSpotify[j])
        ]);
      } else {
        return axios.all(songOneRequests);
      }
    }
  }

  // closure function passed into axios.spread for handling data
  // returned from up to 4 parallel ajax requests. Adds song object with
  // video data and spotify data to results.
  function addSongDetailsAndVideo(
    i, j, youtubeData0, spotifyData0, youtubeData1, spotifyData1
  ) {
    if (
      resultsYoutube[i] &&
      resultsSpotify[i] &&
      youtubeData0 &&
      spotifyData0 &&
      tracks[i]
    ) {
      const songOneData = {
        vid: youtubeData0.data,
        track: tracks[i],
        details: spotifyData0.body.tracks.items[0]
      };
      if (
        resultsYoutube[j] &&
        resultsSpotify[j] &&
        youtubeData1 &&
        spotifyData1 &&
        tracks[j]
      ) {
        results.push(songOneData, {
          vid: youtubeData1.data,
          track: tracks[j],
          details: spotifyData1.body.tracks.items[0]
        });
      } else {
        results.push(songOneData);
      }
    }
  }

  // enter promise returned from musixmatch ajax request
  // and deal with the <= 20 search results
  musixmatchSearch(options)
    .then(({ data }) => {

      // store all unique results. First
      // result will be considered unique
      let uniqueResultsYoutube = [];
      let uniqueResultsSpotify = [];
      let uniqueTracks = [];

      // other results are determined to be unique based
      // on similarity (compared with string-similarity library)
      let otherResultsYoutube = [];
      let otherResultsSpotify = [];
      let otherTracks = [];

      // iterate over songs returned from musixmatch call
      // add string to be used for youtube and spotify api calls
      // for each request
      data.message.body.track_list.forEach((result, i) => {
        const ytStr = `${result.track.artist_name} ${result.track.track_name}`;
        const spotStr = `track:${result.track.track_name} artist:${result.track.artist_name}`;
        const track = { name: result.track.track_name, artist: result.track.artist_name };

        // if it's the first item, we're counting it as unique
        if (i === 0) {
          uniqueResultsYoutube.push(ytStr);
          uniqueResultsSpotify.push(spotStr);
          uniqueTracks.push(track);
        } else {
          otherResultsYoutube.push(ytStr);
          otherResultsSpotify.push(spotStr);
          otherTracks.push(track);
        }
      });

      for (let i = 0; i < otherResultsYoutube.length; i++) {

        // use some to check whether any string in uniqueResults
        // is similar to the current other results value
        const similar = uniqueResultsYoutube.some(uniqueResult => {
          let similarity = stringSimilarity.compareTwoStrings(
            otherResultsYoutube[i], uniqueResult
          );
          return similarity > 0.3;
        });

        // if not similar add result to unique results arrays
        if (!similar) {
          uniqueResultsYoutube.push(otherResultsYoutube[i]);
          uniqueResultsSpotify.push(otherResultsSpotify[i]);
          uniqueTracks.push(otherTracks[i]);
        }
      }

      // remove all but the first 4 unique values
      resultsYoutube = uniqueResultsYoutube.slice(0, 4);
      resultsSpotify = uniqueResultsSpotify.slice(0, 4);
      tracks = uniqueTracks.slice(0, 4);
    })

    // Get song details and video details in parallel for 2 songs
    // at a time. Have them separated by each result, so if it
    // fails, any others that have been added to the results
    // array with still be returned to the user
    .then(songDetailsAndVideo.bind(null, 0, 1))
    .then(axios.spread(addSongDetailsAndVideo.bind(null, 0, 1)))
    .then(songDetailsAndVideo.bind(null, 2, 3))
    .then(axios.spread(addSongDetailsAndVideo.bind(null, 2, 3)))
    .then(() => res.json(results))
    .catch(error => {
      console.log(error);
      // if there is something in results,
      // go ahead and return what we have
      if (results.length) {
        res.json(results);
      } else {
        res.json({ failed: true });
      }
    });
}

/**
 * addSong
 * Add song to library
 */
function addSong(song, res) {
  libraryController.addSong(song, (err, exists) => {
    if (err) {
      console.log(err);
      return res.json({ failed: true });
    }
    if (!exists) {
      res.json(song);
    } else {
      res.json(null);
    }
  });
}

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
    // if the state is valid, get the authorization
    // code and pass it on to the client
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


/**
 * /api/lyrics-search/:lyrics/:artist (artist optional)
 * Search for songs by lyrics from musixmatch, and then take the
 * most unique four songs and get the youtube and spotify data,
 * collect it in an array and send it back to the user
 */
router.get('/api/lyrics-search/:lyrics/:artist', (req, res) => {
  const { lyrics, artist } = req.params;
  let lyricsOpts = `&q_lyrics=${lyrics}`;
  if (artist !== 'null') lyricsOpts += `&q_artist=${artist}`;
  getAllSongs(lyricsOpts, res);
});

/**
 * /api/song-search/:song/:artist (artist optional)
 * Search for songs by lyrics from musixmatch, and then take
 * the most unique four songs and get the youtube and spotify
 * data, collect it in an array and send it back to the user
 */
router.get('/api/song-search/:song/:artist', (req, res) => {
  const { song, artist } = req.params;
  let songOpts = `&q_track=${song}`;
  if (artist !== 'null') songOpts += `&q_artist=${artist}`;
  getAllSongs(songOpts, res);
});

/**
 * /logout
 * Logs out user from spotify. Removes spotify oauth access token
 * and refresh token, clears user object on userController,
 * and redirects to spotify to logout only way to logout
 * from spotify :( well... as far as we can tell at the moment
 */
router.get('/logout', (req, res) => {
  req.session.destroy();
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();
  userController.user = {};
  res.redirect('https://spotify.com/logout');
});

/**
 * /addToLibrary
 * Add song to library. Create a song object, find the users's
 * library. If one doesn't exist, create it. Add song
 */
router.post('/addToLibrary', (req, res) => {
  const songData = req.body;
  songController.createSong(songData, (err, song) => {
    if (err) {
      console.error(err);
      return res.json({ failed: true });
    }
    let userId = userController.getUserId();

    libraryController.findLibrary(userId, (err, library) => {
      if (err) {
        console.error(err);
        return res.json({ failed: true });
      }
      if (!library) {
        libraryController.createLibrary(userId, err => {
          if (err) {
            console.log(err);
            return res.json({ failed: true });
          }
          addSong(song, res);
        });
      } else { // library already exists, just add the song
        addSong(song, res);
      }
    });
  });
});

/**
 * /removeFromLibrary
 * Remove song from user's library. Find library first, then
 * try to remove only if it exists
 */
router.post('/removeFromLibrary', (req, res) => {
  const song = req.body;
  const userId = userController.getUserId();

  libraryController.findLibrary(userId, (err, library) => {
    if (err) {
      console.log(err);
      return res.json({ failed: true });
    }

    if (!library) {
      res.end();
    } else {
      libraryController.removeSong(song, (err, deletedSong) => {
        if (err) {
          console.error(err);
          return res.json({ failed: true });
        }
        res.json(deletedSong);
      });
    }
  });
});

/**
 * /fetchLibrary
 * Fetch user's library
 */
router.get('/fetchLibrary', (req, res) => {
  const userId = userController.getUserId();
  libraryController.findLibrary(userId, (err, library) => {
    if (err) {
      console.error(err);
      return res.json({ failed: true });
    }
    if (!library) {
      res.end();
    } else {
      libraryController.getAll(userId, (err, librarySongs) => {
        if (err) {
          console.error(err);
          return res.json({ failed: true });
        }
        res.json(librarySongs);
      });
    }
  });
});

module.exports = router;
