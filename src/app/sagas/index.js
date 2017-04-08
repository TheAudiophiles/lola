import { call, fork, put } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';
import axios from 'axios';
import Spotify from 'spotify-web-api-js';

import * as type from '../constants/types';
import * as action from '../actions';

const spotifyApi = new Spotify();

/**
 * =======================================
 *  WORKERS
 * =======================================
 */

export function* fetchUser() {
  try {
    const request = yield call(spotifyApi.getMe);
    yield put(action.spotifyMeSuccess(request));
  } catch(error) {
    yield put(action.spotifyMeFailure(error));
  }
}

export function* fetchSongByLyrics({ lyrics }) {
  try {
    yield put(action.fetchSongLoading());
    const request = yield call(axios.get, `/api/lyrics-search/${lyrics}/null`);
    if (request.data.failed || typeof request.data !== 'object') {
      throw new Error('Failed to get song');
    }
    yield put(action.fetchSongVideoSuccess(request));
  } catch(error) {
    yield put(action.fetchSongVideoFailure(error));
  }
}

export function* fetchSongByName({ name, artist }) {
  try {
    yield put(action.fetchSongLoading());
    if (!artist) artist = 'null';
    const request = yield call(axios.get, `/api/song-search/${name}/${artist}`);
    if (request.data.failed || typeof request.data !== 'object') {
      throw new Error('Failed to get song');
    }
    yield put(action.fetchSongVideoSuccess(request));
  } catch(error) {
    yield put(action.fetchSongVideoFailure(error));
  }
}

export function* setSpotifyTokens({ accessToken, refreshToken }) {
  if (accessToken && refreshToken) {
    spotifyApi.setAccessToken(accessToken);
    yield put(action.setTokensSuccess({ accessToken, refreshToken }));
  } else {
    yield put(action.setTokensFailure());
  }
}

export function* addSongToLibrary({ song }) {
  try {
    const response = yield call(axios.post, `/addToLibrary`, song);
    if (response.status !== 200 || response.data.failed) {
      throw new Error('Failed to add song to library');
    }
    yield put(action.addSongToLibrarySuccess(response.data));
  } catch(error) {
    yield put(action.addSongToLibraryFailure(error));
  }
}

export function* fetchLibrary() {
  try {
    const request = yield call(axios.get, `/fetchLibrary`);
    if (request.data.failed || typeof request.data !== 'object') {
      throw new Error('Failed to get songs from user\'s library');
    }
    yield put(action.fetchLibrarySuccess(request.data));
  } catch(error) {
    yield put(action.fetchLibraryFailure(error));
  }
}

export function* removeSongFromLibrary({ song }) {
  try {
    const response = yield call(axios.post, `/removeFromLibrary`, song);
    if (response.status !== 200 || response.data.failed) {
      throw new Error('Failed to remove song from library');
    }
    yield put(action.removeSongFromLibrarySuccess(response.data));
  } catch(error) {
    yield put(action.removeSongFromLibraryFailure(error));
  }
}
/**
 * =======================================
 *  WATCHERS (in root saga)
 * =======================================
 */

export default function* root() {
  yield [
    takeLatest(type.SPOTIFY_ME_BEGIN, fetchUser),
    takeEvery(type.SEARCH_LYRICS_BEGIN, fetchSongByLyrics),
    takeEvery(type.SEARCH_SONG_NAME_BEGIN, fetchSongByName),
    takeEvery(type.SPOTIFY_TOKENS, setSpotifyTokens),
    takeEvery(type.ADD_SONG_TO_LIBRARY_BEGIN, addSongToLibrary),
    takeEvery(type.FETCH_LIBRARY_BEGIN, fetchLibrary),
    takeEvery(type.REMOVE_SONG_FROM_LIBRARY_BEGIN, removeSongFromLibrary)
  ]
}
