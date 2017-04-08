import * as type from '../constants/types';

export const fetchSongByName = (name, artist) => ({
  type: type.SEARCH_SONG_NAME_BEGIN,
  name,
  artist
});

export const fetchSongVideo = lyrics => ({
  type: type.SEARCH_LYRICS_BEGIN,
  lyrics
});

export const fetchSongLoading = () => ({
  type: type.SEARCH_LYRICS_LOADING
});

export const fetchSongVideoSuccess = payload => ({
  type: type.SEARCH_LYRICS_SUCCESS,
  payload
});

export const fetchSongVideoFailure = error => ({
  type: type.SEARCH_LYRICS_FAILURE,
  error
});

export const previousSong = () => ({
  type: type.PREVIOUS_SONG
});

export const nextSong = () => ({
  type: type.NEXT_SONG
});

export const resumeSong = () => ({
  type: type.RESUME_SONG
})

export const pauseSong = () => ({
  type: type.PAUSE_SONG
})

export const navigateTo = index => ({
  type: type.NAVIGATE_TO,
  index
});

export const getMyInfo = () => ({
  type: type.SPOTIFY_ME_BEGIN
});

export const spotifyMeSuccess = payload => ({
  type: type.SPOTIFY_ME_SUCCESS,
  payload
});

export const spotifyMeFailure = error => ({
  type: type.SPOTIFY_ME_FAILURE,
  error
});

export const setTokens = ({ accessToken, refreshToken }) => ({
  type: type.SPOTIFY_TOKENS,
  accessToken,
  refreshToken
});

export const setTokensSuccess = ({ accessToken, refreshToken }) => ({
  type: type.SPOTIFY_TOKENS_SUCCESS,
  accessToken,
  refreshToken
});

export const setTokensFailure = () => ({
  type: type.SPOTIFY_TOKENS_FAILURE
});

export const spotifyLogout = () => ({
  type: type.SPOTIFY_LOGOUT
});

export const resetLogout = () => ({
  type: type.RESET_LOGGEDOUT
});

export const selectSR = payload => ({
  type: type.SELECT_SR,
  payload
});

export const clearState = () => ({
  type: type.CLEAR_STATE
});

export const clearQueue = () => ({
  type: type.CLEAR_QUEUE
});

export const addSongToLibrary = song => ({
  type: type.ADD_SONG_TO_LIBRARY_BEGIN,
  song
});

export const addSongToLibrarySuccess = song => ({
  type: type.ADD_SONG_TO_LIBRARY_SUCCESS,
  song
});

export const addSongToLibraryFailure = error => ({
  type: type.ADD_SONG_TO_LIBRARY_FAILURE,
  error
});

export const increaseVolume = () => ({
  type: type.INCREASE_VOLUME
});

export const decreaseVolume = () => ({
  type: type.DECREASE_VOLUME
});

export const mute = () => ({
  type: type.MUTE
});

export const unmute = () => ({
  type: type.UNMUTE
});

export const resetVolumeChange = () => ({
  type: type.RESET_VOLUME_CHANGE
});

export const toggleQueue = () => ({
  type: type.TOGGLE_QUEUE
});

export const toggleLibrary = () => ({
  type: type.TOGGLE_LIBRARY
});

export const removeFromQueue = (index) => ({
  type: type.REMOVE_FROM_QUEUE, index
});

export const fetchLibrary = () => ({
  type: type.FETCH_LIBRARY_BEGIN
});

export const fetchLibrarySuccess = librarySongs => ({
  type: type.FETCH_LIBRARY_SUCCESS,
  librarySongs
});

export const fetchLibraryFailure = error => ({
  type: type.FETCH_LIBRARY_FAILURE,
  error
});

export const setSong = song => ({
  type: type.SET_SONG,
  song
});

export const removeSongFromLibrary = song => ({
  type: type.REMOVE_SONG_FROM_LIBRARY_BEGIN,
  song
});

export const removeSongFromLibrarySuccess = deletedSong => ({
  type: type.REMOVE_SONG_FROM_LIBRARY_SUCCESS,
  deletedSong
});

export const removeSongFromLibraryFailure = error => ({
  type: type.REMOVE_SONG_FROM_LIBRARY_FAILURE,
  error
});

export const resetLibraryAddFailed = () => ({
  type: type.RESET_LIBRARY_ADD_FAILED
});

export const resetLibraryFetchFailed = () => ({
  type: type.RESET_LIBRARY_FETCH_FAILED
});

export const resetLibraryRemoveFailed = () => ({
  type: type.RESET_LIBRARY_REMOVE_FAILED
});
