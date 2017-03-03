export const SEARCH_SONG_NAME_BEGIN = 'SEARCH_SONG_NAME_BEGIN';
export const SEARCH_LYRICS_BEGIN = 'SEARCH_LYRICS_BEGIN';
export const SEARCH_LYRICS_LOADING = 'SEARCH_LYRICS_LOADING';
export const SEARCH_LYRICS_SUCCESS = 'SEARCH_LYRICS_SUCCESS';
export const SEARCH_LYRICS_FAILURE = 'SEARCH_LYRICS_FAILURE';
export const PREVIOUS_SONG = 'PREVIOUS_SONG';
export const NEXT_SONG = 'NEXT_SONG';
export const RESUME_SONG = 'RESUME_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const NAVIGATE_TO = 'NAVIGATE_TO';
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_TOKENS_SUCCESS = 'SPOTIFY_TOKENS_SUCCESS';
export const SPOTIFY_TOKENS_FAILURE = 'SPOTIFY_TOKENS_FAILURE';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_LOGOUT = 'SPOTIFY_LOGOUT';
export const RESET_LOGGEDOUT = 'RESET_LOGGEDOUT';
export const SELECT_SR = 'SELECT_SR';
export const CLEAR_STATE = 'CLEAR_STATE';
export const CLEAR_QUEUE = 'CLEAR_QUEUE';
export const ADD_SONG_TO_LIBRARY_BEGIN = 'ADD_SONG_TO_LIBRARY_BEGIN';
export const ADD_SONG_TO_LIBRARY_SUCCESS = 'ADD_SONG_TO_LIBRARY_SUCCESS';
export const ADD_SONG_TO_LIBRARY_FAILURE = 'ADD_SONG_TO_LIBRARY_FAILURE';
export const INCREASE_VOLUME = 'INCREASE_VOLUME';
export const DECREASE_VOLUME = 'DECREASE_VOLUME';
export const MUTE = 'MUTE';
export const UNMUTE = 'UNMUTE';
export const RESET_VOLUME_CHANGE = 'RESET_VOLUME_CHANGE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';
export const TOGGLE_QUEUE = 'TOGGLE_QUEUE';
export const TOGGLE_LIBRARY = 'TOGGLE_LIBRARY';
export const FETCH_LIBRARY_BEGIN = 'FETCH_LIBRARY_BEGIN';
export const FETCH_LIBRARY_SUCCESS = 'FETCH_LIBRARY_SUCCESS';
export const FETCH_LIBRARY_FAILURE = 'FETCH_LIBRARY_FAILURE';
export const SET_SONG = 'SET_SONG';
export const REMOVE_SONG_FROM_LIBRARY_BEGIN = 'REMOVE_SONG_FROM_LIBRARY_BEGIN';
export const REMOVE_SONG_FROM_LIBRARY_SUCCESS = 'REMOVE_SONG_FROM_LIBRARY_SUCCESS';
export const REMOVE_SONG_FROM_LIBRARY_FAILURE = 'REMOVE_SONG_FROM_LIBRARY_FAILURE';

export const fetchSongByName = (name, artist) => ({
  type: SEARCH_SONG_NAME_BEGIN,
  name,
  artist
});

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
 * fetchSongLoading - Action to show loading gif while song
 * is being requested
 *
 * @return {object} redux action
 */
export const fetchSongLoading = () => ({
  type: SEARCH_LYRICS_LOADING
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
 * resumeSong - resumes current song on Song state
 *
 * @return {object} redux action
 */

export const resumeSong = () => ({
  type: RESUME_SONG
})

/**
 * pauseSong - pauses current song on Song state
 *
 * @return {object} redux action
 */

export const pauseSong = () => ({
  type: PAUSE_SONG
})

export const navigateTo = index => ({
  type: NAVIGATE_TO,
  index
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
 * spotifyMeSuccess - Successfully received account info
 * from spotify
 *
 * @param {object} payload account info
 *
 * @return {object} redux action
 */
export const spotifyMeSuccess = payload => ({
  type: SPOTIFY_ME_SUCCESS,
  payload
});


/**
 * spotifyMeFailure - Failed to get account info
 * from stotify
 *
 * @param {object} error
 *
 * @return {object} redux action
 */
export const spotifyMeFailure = error => ({
  type: SPOTIFY_ME_FAILURE,
  error
});


/**
 * setTokens - Start to set tokens for spotify OAuth
 *
 * @param {object} Access and refresh tokens
 *
 * @return {object} redux action
 */
export const setTokens = ({ accessToken, refreshToken }) => ({
  type: SPOTIFY_TOKENS,
  accessToken,
  refreshToken
});


/**
 * setTokensSuccess - Successfully set tokens for spotify OAuth
 *
 * @param {object} Access and refresh tokens
 *
 * @return {object} redux action
 */
export const setTokensSuccess = ({ accessToken, refreshToken }) => ({
  type: SPOTIFY_TOKENS_SUCCESS,
  accessToken,
  refreshToken
});


/**
 * setTokensFailure - Failed to set tokens for spotify OAuth
 *
 * @return {object} redux action
 */
export const setTokensFailure = () => ({
  type: SPOTIFY_TOKENS_FAILURE
});


/**
 * spotifyLogout - Logout from our app and spotify
 *
 * @return {object} redux action
 */
export const spotifyLogout = () => ({
  type: SPOTIFY_LOGOUT
});

/**
 * resetLogout - Reset loggedOut property in auth after logged out
 *
 * @return {object} redux action
 */
export const resetLogout = () => ({
  type: RESET_LOGGEDOUT
});

/**
 * selectSR - Change the current song to the song that was selected
 * from the search results
 *
 * @return {object} redux action
 */
export const selectSR = payload => ({
  type: SELECT_SR,
  payload
});

export const clearState = () => ({
  type: CLEAR_STATE
});

export const clearQueue = () => ({
  type: CLEAR_QUEUE
});

export const addSongToLibrary = song => ({
  type: ADD_SONG_TO_LIBRARY_BEGIN,
  song
});

export const addSongToLibrarySuccess = song => ({
  type: ADD_SONG_TO_LIBRARY_SUCCESS,
  song
});

export const addSongToLibraryFailure = error => ({
  type: ADD_SONG_TO_LIBRARY_FAILURE,
  error
});

export const increaseVolume = () => ({
  type: INCREASE_VOLUME
});

export const decreaseVolume = () => ({
  type: DECREASE_VOLUME
});

export const mute = error => ({
  type: MUTE
});

export const unmute = error => ({
  type: UNMUTE
});

export const resetVolumeChange = error => ({
  type: RESET_VOLUME_CHANGE
});

export const toggleQueue = () => ({
  type: TOGGLE_QUEUE
});

export const toggleLibrary = () => ({
  type: TOGGLE_LIBRARY
});

export const removeFromQueue = (index) => ({
  type: REMOVE_FROM_QUEUE, index
});

export const fetchLibrary = error => ({
  type: FETCH_LIBRARY_BEGIN
});

export const fetchLibrarySuccess = librarySongs => ({
  type: FETCH_LIBRARY_SUCCESS,
  librarySongs
});

export const fetchLibraryFailure = err => ({
  type: FETCH_LIBRARY_FAILURE,
  err
});

export const setSong = song => ({
  type: SET_SONG,
  song
});

export const removeSongFromLibrary = song => ({
  type: REMOVE_SONG_FROM_LIBRARY_BEGIN,
  song
});

export const removeSongFromLibrarySuccess = deletedSong => ({
  type: REMOVE_SONG_FROM_LIBRARY_SUCCESS,
  deletedSong
});

export const removeSongFromLibraryFailure = error => ({
  type: REMOVE_SONG_FROM_LIBRARY_FAILURE,
  error
});
