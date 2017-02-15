import axios from 'axios';

export const SEARCH_BY_LYRICS = 'SEARCH_BY_LYRICS';
export const PREVIOUS_SONG = 'PREVIOUS_SONG';
export const NEXT_SONG = 'NEXT_SONG';

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
