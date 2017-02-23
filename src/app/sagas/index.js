import { call, fork, put } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';
import axios from 'axios';
import Spotify from 'spotify-web-api-js';

import {
  SPOTIFY_ME_BEGIN,
  SEARCH_LYRICS_BEGIN,
  SPOTIFY_TOKENS,
  spotifyMeSuccess,
  spotifyMeFailure,
  fetchSongLoading,
  fetchSongVideoSuccess,
  fetchSongVideoFailure,
  setTokensSuccess,
  setTokensFailure
} from '../actions';

const spotifyApi = new Spotify();

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
    const request = yield call(axios.get, `/api/lyrics-search/${lyrics}`);
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

/**
 * =======================================
 *  WATCHERS (in root saga)
 * =======================================
 */

export default function* root() {
  yield [
    takeLatest(SPOTIFY_ME_BEGIN, fetchUser),
    takeEvery(SEARCH_LYRICS_BEGIN, fetchSongByLyrics),
    takeEvery(SPOTIFY_TOKENS, setSpotifyTokens)
  ]
}
