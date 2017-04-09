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
  // not full song object
  const song0 = {
    vid: {
      items: [
        { id: { videoId: 'zPTyic_WPxI' } }
      ]
    },
    track: {
      name: 'Angel Of Death',
      artist: 'Hank Williams'
    }
  };
  const song1 = {
    vid: {
      items: [
        { id: { videoId: 'ifS90c12KlEaj' } }
      ]
    },
    track: {
      name: 'Truckin',
      artist: 'Grateful Dead'
    }
  };
  const song2 = {
    vid: {
      items: [
        { id: { videoId: '19sAewJH22I' } }
      ]
    },
    track: {
      name: 'I am the Walrus',
      artist: 'The Beatles'
    }
  };

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SEARCH_LYRICS_LOADING', () => {
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(reducer(
      initialState,
      {
        type: type.SEARCH_LYRICS_LOADING
      }
    )).toEqual(expectedState);
  });

  it('should handle SEARCH_LYRICS_SUCCESS where payload is empty', () => {
    const expectedState = {
      allSongs: [],
      currentSongIndex: 0,
      searchResults: [],
      loading: false,
      searchEmpty: true
    };
    const action = {
      type: type.SEARCH_LYRICS_SUCCESS,
      payload: { data: [] }
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SEARCH_LYRICS_SUCCESS', () => {
    const beginState = {
      allSongs: [ song0 ],
      currentSongIndex: 0,
      searchResults: [],
      loading: false,
      searchEmpty: false
    };
    const expectedState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [],
      loading: false,
      searchEmpty: false
    };
    const action = {
      type: type.SEARCH_LYRICS_SUCCESS,
      payload: {
        data: [ song1 ]
      }
    };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle SEARCH_LYRICS_SUCCESS where primary song already exists', () => {
    const beginState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 0,
      searchResults: [],
      loading: false,
      searchEmpty: false
    };
    const expectedState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [],
      loading: false,
      searchEmpty: false
    };
    const action = {
      type: type.SEARCH_LYRICS_SUCCESS,
      payload: {
        data: [ song1 ]
      }
    };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle SEARCH_LYRICS_SUCCESS where secondary song exists', () => {
    const beginState = {
      allSongs: [ song0 ],
      currentSongIndex: 0,
      searchResults: [],
      loading: false,
      searchEmpty: false
    };
    const expectedState = {
      allSongs: [ song0, song2 ],
      currentSongIndex: 1,
      searchResults: [ song1 ],
      loading: false,
      searchEmpty: false
    };
    const action = {
      type: type.SEARCH_LYRICS_SUCCESS,
      payload: {
        data: [ song2, song0, song1 ]
      }
    };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle SEARCH_LYRICS_FAILURE', () => {
    const beginState = {
      allSongs: [],
      currentSongIndex: 0,
      searchResults: [],
      searchEmpty: false,
      loading: true
    };
    const action = { type: type.SEARCH_LYRICS_FAILURE };
    expect(reducer(beginState, action)).toEqual(initialState);
  });

  it('should handle PREVIOUS_SONG', () => {
    const beginState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const expectedState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 0,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const action = { type: type.PREVIOUS_SONG };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle PREVIOUS_SONG where song is at beginning', () => {
    const beginState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 0,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const expectedState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 0,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const action = { type: type.PREVIOUS_SONG };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle NEXT_SONG', () => {
    const beginState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 0,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const expectedState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const action = { type: type.NEXT_SONG };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle NEXT_SONG where song is at end', () => {
    const beginState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const expectedState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const action = { type: type.NEXT_SONG };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle NAVIGATE_TO', () => {
    const beginState = {
      allSongs: [ song0, song1, song2 ],
      currentSongIndex: 1,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const expectedState = {
      allSongs: [ song0, song1, song2 ],
      currentSongIndex: 2,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const action = { type: type.NAVIGATE_TO, index: 2 };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle SELECT_SEARCH_RESULT', () => {
    const beginState = {
      allSongs: [ song0 ],
      currentSongIndex: 0,
      searchResults: [ song1, song2 ],
      searchEmpty: false,
      loading: false
    };
    const expectedState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [ song2 ],
      searchEmpty: false,
      loading: false
    };
    const action = {
      type: type.SELECT_SEARCH_RESULT,
      payload: song1
    };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_FROM_QUEUE', () => {
    const beginState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [ song2 ],
      searchEmpty: false,
      loading: false
    };
    const expectedState = {
      allSongs: [ song0 ],
      currentSongIndex: 0,
      searchResults: [ song2 ],
      searchEmpty: false,
      loading: false
    };
    const action = {
      type: type.REMOVE_FROM_QUEUE,
      index: 1
    };
    expect(reducer(beginState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_STATE', () => {
    const beginState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [ song2 ],
      searchEmpty: false,
      loading: false
    };
    const action = { type: type.CLEAR_STATE };
    expect(reducer(beginState, action)).toEqual(initialState);
  });

  it('should handle CLEAR_QUEUE', () => {
    const beginState = {
      allSongs: [ song0, song1 ],
      currentSongIndex: 1,
      searchResults: [ song2 ],
      searchEmpty: false,
      loading: false
    };
    const action = { type: type.CLEAR_QUEUE };
    expect(reducer(beginState, action)).toEqual(initialState);
  });

  it('should handle SET_SONG', () => {
    const librarySong = {
      _id: '58e99f2f754ab3cdc1eb36d0',
      album: 'The Complete Hank Williams',
      image: 'https://i.scdn.co/image/962158509a04e3fef31cbb79ad0c7dc0cc72fb3d',
      videoId: 'zPTyic_WPxI',
      artist: 'Hank Williams',
      title: 'The Angel Of Death - Undubbed Version'
    };
    const song = {
      vid: {
        items: [{
          id: { videoId: 'zPTyic_WPxI' }
        }]
      },
      track: {
        name: 'The Angel Of Death - Undubbed Version',
        artist: 'Hank Williams'
      },
      details: {
        album: {
          name: 'The Complete Hank Williams',
          images: [{
            url: 'https://i.scdn.co/image/962158509a04e3fef31cbb79ad0c7dc0cc72fb3d'
          }]
        },
        artists: [{ name: 'Hank Williams' }],
        name: 'The Angel Of Death - Undubbed Version'
      }
    };
    const expectedState = {
      allSongs: [ song ],
      currentSongIndex: 0,
      searchResults: [],
      searchEmpty: false,
      loading: false
    };
    const action = {
      type: type.SET_SONG,
      song: librarySong
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
