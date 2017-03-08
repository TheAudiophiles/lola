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
  FETCH_LIBRARY_BEGIN,
  REMOVE_SONG_FROM_LIBRARY_BEGIN,
  spotifyMeSuccess,
  spotifyMeFailure,
  fetchSongLoading,
  fetchSongVideoSuccess,
  fetchSongVideoFailure,
  setTokensSuccess,
  setTokensFailure,
  addSongToLibrarySuccess,
  addSongToLibraryFailure,
  fetchLibrarySuccess,
  fetchLibraryFailure,
  removeSongFromLibrarySuccess,
  removeSongFromLibraryFailure
} from '../actions';

const spotifyApi = new Spotify();

/**
 * =======================================
 *  WORKERS
 * =======================================
 */

export function* fetchUser() {
  try {
    const request = yield call(spotifyApi.getMe);
    yield put(spotifyMeSuccess(request));
  } catch(error) {
    yield put(spotifyMeFailure(error));
  }
}

export function* fetchSongByLyrics({ lyrics }) {
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

export function* fetchSongByName({ name, artist }) {
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

export function* setSpotifyTokens({ accessToken, refreshToken }) {
  if (accessToken && refreshToken) {
    spotifyApi.setAccessToken(accessToken);
    yield put(setTokensSuccess({ accessToken, refreshToken }));
  } else {
    yield put(setTokensFailure());
  }
}

export function* addSongToLibrary({ song }) {
  try {
    const response = yield call(axios.post, `/addToLibrary`, song);
    if (response.status !== 200) {
      throw new Error('Failed to add song to library');
    }
    yield put(addSongToLibrarySuccess(response.data));
  } catch(error) {
    yield put(addSongToLibraryFailure(error));
  }
}

export function* fetchLibrary() {
  try {
    const request = yield call(axios.get, `/fetchLibrary`);
    if (request.data.failed || typeof request.data !== 'object') {
      throw new Error('Failed to get songs from user\'s library');
    }
    yield put(fetchLibrarySuccess(request.data));
  } catch(error) {
    yield put(fetchLibraryFailure(error));
  }
}

export function* removeSongFromLibrary({ song }) {
  try {
    const response = yield call(axios.post, `/removeFromLibrary`, song);
    if (response.status !== 200) {
      throw new Error('Failed to remove song from library');
    }
    yield put(removeSongFromLibrarySuccess(response.data)); // should be just the song
  } catch(error) {
    yield put(removeSongFromLibraryFailure(error));
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
    takeEvery(ADD_SONG_TO_LIBRARY_BEGIN, addSongToLibrary),
    takeEvery(FETCH_LIBRARY_BEGIN, fetchLibrary),
    takeEvery(REMOVE_SONG_FROM_LIBRARY_BEGIN, removeSongFromLibrary)
  ]
}
