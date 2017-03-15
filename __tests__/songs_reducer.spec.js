import reducer from '../src/app/reducers/songs';

import {
  SEARCH_LYRICS_LOADING,
  SEARCH_LYRICS_SUCCESS,
  SEARCH_LYRICS_FAILURE,
  NAVIGATE_TO,
  PREVIOUS_SONG,
  NEXT_SONG,
  SELECT_SR,
  CLEAR_STATE,
  CLEAR_QUEUE,
  REMOVE_FROM_QUEUE,
  SET_SONG
} from '../src/app/actions';

describe('songs reducer', () => {
  const initialState = {
    allSongs: [],
    currentSongIndex: 0,
    searchResults: [],
    loading: false,
  };

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SEARCH_LYRICS_LOADING', () => {
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(reducer(initialState, { type: SEARCH_LYRICS_LOADING })).toEqual(expectedState);
  });
});
