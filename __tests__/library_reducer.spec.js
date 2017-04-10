import reducer from '../src/app/reducers/library';
import * as type from '../src/app/constants/types';

describe('library reducer', () => {
  const initialState = {
    library: [],
    error: '',
    addFailed: false,
    fetchFailed: false,
    removeFailed: false
  };

  const song = { title: 'Gimme Shelter', videoId: '123456' };

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_SONG_TO_LIBRARY_SUCCESS where action.song null', () => {
    const beginState = {
      library: [ song ],
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    expect(reducer(
      beginState,
      {
        type: type.ADD_SONG_TO_LIBRARY_SUCCESS,
        song: null
      }
    )).toEqual(beginState);
  });

  it('should handle ADD_SONG_TO_LIBRARY_SUCCESS where action.song exists', () => {
    const expectedState = {
      library: [ song ],
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    expect(reducer(
      initialState,
      {
        type: type.ADD_SONG_TO_LIBRARY_SUCCESS,
        song
      }
    )).toEqual(expectedState);
  });

  it('should handle ADD_SONG_TO_LIBRARY_FAILURE', () => {
    const beginState = {
      library: [ song ],
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    const expectedState = {
      library: [ song ],
      error: 'Failed to add song to library',
      addFailed: true,
      fetchFailed: false,
      removeFailed: false
    };
    expect(reducer(beginState, {
      type: type.ADD_SONG_TO_LIBRARY_FAILURE,
      error: 'Failed to add song to library'
    })).toEqual(expectedState);
  });

  it('should handle FETCH_LIBRARY_SUCCESS', () => {
    const songs = [ song ];
    const expectedState = {
      library: songs,
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    expect(reducer(
      initialState,
      {
        type: type.FETCH_LIBRARY_SUCCESS,
        librarySongs: songs
      }
    )).toEqual(expectedState);
  });

  it('should handle FETCH_LIBRARY_FAILURE', () => {
    const expectedState = {
      library: [],
      error: 'Failed to get songs from user\'s library',
      addFailed: false,
      fetchFailed: true,
      removeFailed: false
    };
    expect(reducer(initialState, {
      type: type.FETCH_LIBRARY_FAILURE,
      error: 'Failed to get songs from user\'s library'
    })).toEqual(expectedState);
  });

  it('should handle REMOVE_SONG_FROM_LIBRARY_SUCCESS', () => {
    const song2 = { title: 'Song', videoId: '323242' }
    const beginState = {
      library: [ song, song2 ],
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    const expectedState = {
      library: [ song2 ],
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    expect(reducer(
      beginState,
      {
        type: type.REMOVE_SONG_FROM_LIBRARY_SUCCESS,
        deletedSong: song
      }
    )).toEqual(expectedState);
  });

  it('should handle REMOVE_SONG_FROM_LIBRARY_FAILURE', () => {
    const beginState = {
      library: [ song ],
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    const expectedState = {
      library: [ song ],
      error: 'Failed to remove song from library',
      addFailed: false,
      fetchFailed: false,
      removeFailed: true
    };
    expect(reducer(
      beginState,
      {
        type: type.REMOVE_SONG_FROM_LIBRARY_FAILURE,
        error: 'Failed to remove song from library'
      }
    )).toEqual(expectedState);
  });

  it('should handle RESET_LIBRARY_ADD_FAILED', () => {
    const beginState = {
      library: [ song ],
      error: 'Failed to add song to library',
      addFailed: true,
      fetchFailed: false,
      removeFailed: false
    };
    const expectedState = {
      library: [ song ],
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    expect(reducer(
      beginState,
      {
        type: type.RESET_LIBRARY_ADD_FAILED
      }
    )).toEqual(expectedState);
  });

  it('should handle RESET_LIBRARY_FETCH_FAILED', () => {
    const beginState = {
      library: [],
      error: 'Failed to get songs from user\'s library',
      addFailed: false,
      fetchFailed: true,
      removeFailed: false
    };
    expect(reducer(
      beginState,
      {
        type: type.RESET_LIBRARY_FETCH_FAILED
      }
    )).toEqual(initialState);
  });

  it('should handle RESET_LIBRARY_REMOVE_FAILED', () => {
    const beginState = {
      library: [ song ],
      error: 'Failed to remove song from library',
      addFailed: false,
      fetchFailed: false,
      removeFailed: true
    };
    const expectedState = {
      library: [ song ],
      error: '',
      addFailed: false,
      fetchFailed: false,
      removeFailed: false
    };
    expect(reducer(
      beginState,
      {
        type: type.RESET_LIBRARY_REMOVE_FAILED
      }
    )).toEqual(expectedState);
  });
});
