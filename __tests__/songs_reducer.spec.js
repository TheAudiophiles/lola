import reducer from '../src/app/reducers/songs';
import * as type from '../src/app/constants/types';

describe('songs reducer', () => {
  const initialState = {
    allSongs: [],
    currentSongIndex: 0,
    searchResults: [],
    loading: false,
    searchEmpty: false
  };

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SEARCH_LYRICS_LOADING', () => {
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(reducer(initialState, { type: type.SEARCH_LYRICS_LOADING })).toEqual(expectedState);
  });
});
