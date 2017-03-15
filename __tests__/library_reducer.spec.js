import reducer from '../src/app/reducers/library';

import {
  ADD_SONG_TO_LIBRARY_SUCCESS,
  ADD_SONG_TO_LIBRARY_FAILURE,
  FETCH_LIBRARY_SUCCESS,
  FETCH_LIBRARY_FAILURE,
  REMOVE_SONG_FROM_LIBRARY_SUCCESS,
  REMOVE_SONG_FROM_LIBRARY_FAILURE
} from '../src/app/actions';

describe('library reducer', () => {
  const initialState = {
    library: []
  };

  const song = { title: 'Gimme Shelter', videoId: '123456' };

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_SONG_TO_LIBRARY_SUCCESS where action.song null', () => {
    const beginState = {
      library: [ song ]
    };
    expect(reducer(
      beginState,
      {
        type: ADD_SONG_TO_LIBRARY_SUCCESS,
        song: null
      }
    )).toEqual(beginState);
  });

  it('should handle ADD_SONG_TO_LIBRARY_SUCCESS where action.song exists', () => {
    const expectedState = {
      library: [ song ]
    };
    expect(reducer(
      initialState,
      {
        type: ADD_SONG_TO_LIBRARY_SUCCESS,
        song
      }
    )).toEqual(expectedState);
  });

  it('should handle ADD_SONG_TO_LIBRARY_FAILURE', () => {
    const beginState = {
      library: [ song ]
    };
    expect(reducer(beginState, { type: ADD_SONG_TO_LIBRARY_FAILURE })).toEqual(beginState);
  });

  it('should handle FETCH_LIBRARY_SUCCESS', () => {
    const songs = [ song ];
    const expectedState = {
      library: songs
    };
    expect(reducer(
      initialState,
      {
        type: FETCH_LIBRARY_SUCCESS,
        librarySongs: songs
      }
    )).toEqual(expectedState);
  });

  it('should handle FETCH_LIBRARY_FAILURE', () => {
    expect(reducer(initialState, { type: FETCH_LIBRARY_FAILURE })).toEqual(initialState);
  });

  it('should handle REMOVE_SONG_FROM_LIBRARY_SUCCESS', () => {
    const song2 = { title: 'Song', videoId: '323242' }
    const beginState = {
      library: [ song, song2 ]
    };
    const expectedState = {
      library: [ song2 ]
    };
    expect(reducer(
      beginState,
      {
        type: REMOVE_SONG_FROM_LIBRARY_SUCCESS,
        deletedSong: song
      }
    )).toEqual(expectedState);
  });

  it('should handle REMOVE_SONG_FROM_LIBRARY_FAILURE', () => {
    const beginState = {
      library: [ song ]
    };
    expect(reducer(beginState, { type: REMOVE_SONG_FROM_LIBRARY_FAILURE })).toEqual(beginState);
  });
});
