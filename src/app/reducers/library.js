import * as type from '../constants/types';

const initialState = {
  library: [],
  error: '',
  addFailed: false,
  fetchFailed: false,
  removeFailed: false
};

export default function library(state = initialState, action) {
  switch (action.type) {
    case type.ADD_SONG_TO_LIBRARY_SUCCESS:
      if (action.song === null) return state;
      else {
        let { library } = state;
        return {
          ...state,
          library: [ ...library, action.song ]
        };
      }

    case type.ADD_SONG_TO_LIBRARY_FAILURE:
      return {
        ...state,
        error: action.error,
        addFailed: true
      };

    case type.FETCH_LIBRARY_SUCCESS:
      return {
        ...state,
        library: action.librarySongs
      };

    case type.FETCH_LIBRARY_FAILURE:
      return {
        ...state,
        error: action.error,
        fetchFailed: true
      };

    case type.REMOVE_SONG_FROM_LIBRARY_SUCCESS:
      const { title, videoId } = action.deletedSong;
      const { library } = state;
      const songIdx = library.findIndex(song =>
        song.title === title && song.videoId === videoId
      );

      return songIdx !== undefined
        ? {
          ...state,
          library: [
            ...library.slice(0, songIdx),
            ...library.slice(songIdx + 1)
          ]
        }
        : state;

    case type.REMOVE_SONG_FROM_LIBRARY_FAILURE:
      return {
        ...state,
        error: action.error,
        removeFailed: true
      };

    case type.RESET_LIBRARY_ADD_FAILED:
      return {
        ...state,
        error: '',
        addFailed: false
      };

    case type.RESET_LIBRARY_FETCH_FAILED:
      return {
        ...state,
        error: '',
        fetchFailed: false
      };

    case type.RESET_LIBRARY_REMOVE_FAILED:
      return {
        ...state,
        error: '',
        removeFailed: false
      };

    default:
      return state;
  }
}
