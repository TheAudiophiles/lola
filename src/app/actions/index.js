import axios from 'axios';
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

export const SEARCH_BY_LYRICS = 'SEARCH_BY_LYRICS';
export const PREVIOUS_SONG = 'PREVIOUS_SONG';
export const NEXT_SONG = 'NEXT_SONG';
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_LOGOUT = 'SPOTIFY_LOGOUT';

/**
 * Send request with lyrics and recieve an object from the youtube
 * API that contains a videoId
 * @param String lyrics to search for
 * @return Object redux action
 */
export const fetchSongVideo = (lyrics) => {
  const request = axios.get(`/api/lyrics-search/${lyrics}`);

  return {
    type: SEARCH_BY_LYRICS,
    payload: request
  };
};

/**
 * Subtract one from currentSongIndex of Song state
 * @return Object redux action
 */
export const previousSong = () => ({
  type: PREVIOUS_SONG
});

/**
 * Add one to currentSongIndex on Song state
 * @return Object redux action
 */
export const nextSong = () => ({
  type: NEXT_SONG
});


export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

export function getMyInfo() {
  const request = spotifyApi.getMe();
  return {type: SPOTIFY_ME_SUCCESS, payload: request};
  // return dispatch => {
  //   // dispatch({ type: SPOTIFY_ME_BEGIN});
  //   spotifyApi.getMe().then(data => {
  //     dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });

  //   }).catch(e => {
  //    // dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
  //   });
//  };
}


export function spotifyLogout() {
  return {
    type: SPOTIFY_LOGOUT
  };
}
