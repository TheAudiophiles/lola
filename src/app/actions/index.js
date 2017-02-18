export const SEARCH_LYRICS_BEGIN = 'SEARCH_LYRICS_BEGIN';
export const SEARCH_LYRICS_SUCCESS = 'SEARCH_LYRICS_SUCCESS';
export const SEARCH_LYRICS_FAILURE = 'SEARCH_LYRICS_FAILURE';
export const PREVIOUS_SONG = 'PREVIOUS_SONG';
export const NEXT_SONG = 'NEXT_SONG';
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_TOKENS_SUCCESS = 'SPOTIFY_TOKENS_SUCCESS';
export const SPOTIFY_TOKENS_FAILURE = 'SPOTIFY_TOKENS_FAILURE';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_LOGOUT = 'SPOTIFY_LOGOUT';

/**
 * fetchSongVideo - Start request with lyrics to recieve
 * an object from the youtube API that contains a videoId
 *
 * @param {string} lyrics to search for
 *
 * @return {object} redux action
 */
export const fetchSongVideo = lyrics => ({
  type: SEARCH_LYRICS_BEGIN,
  lyrics
});


/**
 * fetchSongVideoSuccess - Successful request of song
 * from lyrics and video data from youtube
 *
 * @param {object} payload from request to /lyrics-search
 *
 * @return {object} redux action
 */
export const fetchSongVideoSuccess = payload => ({
  type: SEARCH_LYRICS_SUCCESS,
  payload
});

/**
 * fetchSongVideoFailure - Failed request of song from
 * lyrics and video data from youtube
 *
 * @param {object} error from request to /lyrics-search
 *
 * @return {object} redux action
 */
export const fetchSongVideoFailure = error => ({
  type: SEARCH_LYRICS_FAILURE,
  error
});

/**
 * previousSong - Subtract one from currentSongIndex of Song state
 *
 * @return {object} redux action
 */
export const previousSong = () => ({
  type: PREVIOUS_SONG
});

/**
 * nextSong - Add one to currentSongIndex on Song state
 *
 * @return {object} redux action
 */
export const nextSong = () => ({
  type: NEXT_SONG
});


/**
 * getMyInfo - Start trying to get spotify info for
 * user with the current set accessToken
 *
 * @return {object} redux action
 */
export const getMyInfo = () => ({
  type: SPOTIFY_ME_BEGIN
});


/**
 * spotifyMeSuccess - Description
 *
 * @param {object} payload Description
 *
 * @return {object} Description
 */
export const spotifyMeSuccess = payload => ({
  type: SPOTIFY_ME_SUCCESS,
  payload
});


/**
 * spotifyMeFailure - Description
 *
 * @param {type} error Description
 *
 * @return {type} Description
 */
export const spotifyMeFailure = error => ({
  type: SPOTIFY_ME_FAILURE,
  error
});


/**
 * setTokens - Description
 *
 * @param {object} Unknown              Description
 * @param {type}   Unknown.accessToken  Description
 * @param {type}   Unknown.refreshToken Description
 *
 * @return {type} Description
 */
export const setTokens = ({ accessToken, refreshToken }) => ({
  type: SPOTIFY_TOKENS,
  accessToken,
  refreshToken
});


/**
 * setTokensSuccess - Description
 *
 * @param {object} Unknown              Description
 * @param {type}   Unknown.accessToken  Description
 * @param {type}   Unknown.refreshToken Description
 *
 * @return {type} Description
 */
export const setTokensSuccess = ({ accessToken, refreshToken }) => ({
  type: SPOTIFY_TOKENS_SUCCESS,
  accessToken,
  refreshToken
});


/**
 * setTokensFailure - Description
 *
 * @return {type} Description
 */
export const setTokensFailure = () => ({
  type: SPOTIFY_TOKENS_FAILURE
});


/**
 * spotifyLogout - Description
 *
 * @return {type} Description
 */
export const spotifyLogout = () => ({
  type: SPOTIFY_LOGOUT
});
