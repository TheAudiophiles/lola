import { call, fork, put } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';
import axios from 'axios';
import Spotify from 'spotify-web-api-js';

import {
  SPOTIFY_ME_BEGIN,
  SEARCH_LYRICS_BEGIN,
  SEARCH_SONG_NAME_BEGIN,
  SPOTIFY_TOKENS,
  ADD_SONG_TO_LIBRARY_BEGIN,
  spotifyMeSuccess,
  spotifyMeFailure,
  fetchSongLoading,
  fetchSongVideoSuccess,
  fetchSongVideoFailure,
  setTokensSuccess,
  setTokensFailure,
  addSongToLibrarySuccess,
  addSongToLibraryFailure
} from '../actions';

const spotifyApi = new Spotify();
window.spotify = spotifyApi;

/**
 * =======================================
 *  WORKERS
 * =======================================
 */

function* fetchUser() {
  try {
    const request = yield call(spotifyApi.getMe);
    yield put(spotifyMeSuccess(request));
  } catch(error) {
    yield put(spotifyMeFailure(error));
  }
}

function* fetchSongByLyrics({ lyrics }) {
  try {
    yield put(fetchSongLoading());
    const request = yield call(axios.get, `/api/lyrics-search/${lyrics}/null`);
    if (request.data.failed || typeof request.data !== 'object') {
      throw new Error('Failed to get song');
    }
    yield put(fetchSongVideoSuccess(request));
  } catch(error) {
    yield put(fetchSongVideoFailure(error));
  }
}

function* fetchSongByName({ name, artist }) {
  try {
    yield put(fetchSongLoading());
    if (!artist) artist = 'null';
    const request = yield call(axios.get, `/api/song-search/${name}/${artist}`);
    if (request.data.failed || typeof request.data !== 'object') {
      throw new Error('Failed to get song');
    }
    yield put(fetchSongVideoSuccess(request));
  } catch(error) {
    yield put(fetchSongVideoFailure(error));
  }
}

function* setSpotifyTokens({ accessToken, refreshToken }) {
  if (accessToken && refreshToken) {
    spotifyApi.setAccessToken(accessToken);
    yield put(setTokensSuccess({ accessToken, refreshToken }));
  } else {
    yield put(setTokensFailure());
  }
}

function* addSongToLibrary({song}) {
  try {
    // console.log('ADDSONGTOLIBRARY SAGA - song:', song);
    const response = yield call(axios.post, `/addToLibrary`, song);
    console.log('ADDSONGTOLIBRARY SAGA - response:', response.data);
    console.log('ADDSONGTOLIBRARY SAGA - response.status:', response.status);
    if (response.status !== 200) { // I think I can craft a response
      throw new Error('Failed to add song to library');
    }
    yield put(addSongToLibrarySuccess(response.data));
  } catch(error) {
    yield put(addSongToLibraryFailure(error));
  }
}
/**
 * =======================================
 *  WATCHERS (in root saga)
 * =======================================
 */

export default function* root() {
  yield [
    takeLatest(SPOTIFY_ME_BEGIN, fetchUser),
    takeEvery(SEARCH_LYRICS_BEGIN, fetchSongByLyrics),
    takeEvery(SEARCH_SONG_NAME_BEGIN, fetchSongByName),
    takeEvery(SPOTIFY_TOKENS, setSpotifyTokens),
    takeEvery(ADD_SONG_TO_LIBRARY_BEGIN, addSongToLibrary)
  ]
}
