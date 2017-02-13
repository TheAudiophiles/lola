import axios from 'axios';

export const SEARCH_BY_LYRICS = 'SEARCH_BY_LYRICS';

export const fetchSongVideo = (lyrics) => {
  const request = axios.get(`/api/lyrics-search/${lyrics}`);

  return {
    type: SEARCH_BY_LYRICS,
    payload: request
  };
};
