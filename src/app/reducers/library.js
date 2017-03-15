import {
  ADD_SONG_TO_LIBRARY_SUCCESS,
  ADD_SONG_TO_LIBRARY_FAILURE,
  FETCH_LIBRARY_SUCCESS,
  FETCH_LIBRARY_FAILURE,
  REMOVE_SONG_FROM_LIBRARY_SUCCESS,
  REMOVE_SONG_FROM_LIBRARY_FAILURE
} from '../actions';

const initialState = {
  library: []
};

export default function library(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG_TO_LIBRARY_SUCCESS:
      if (action.song === null) return state;
      else {
        let { library } = state;
        return { library: [ ...library, action.song ] };
      }

    case ADD_SONG_TO_LIBRARY_FAILURE:
      return state;

    case FETCH_LIBRARY_SUCCESS:
      return { library: action.librarySongs };

    case ADD_SONG_TO_LIBRARY_FAILURE:
      return state;

    case REMOVE_SONG_FROM_LIBRARY_SUCCESS:
      const { title, videoId } = action.deletedSong;
      const { library } = state;

      let songIdx;
      for (let i = 0; i < library.length; i++) {
        if (library[i].title === title && library[i].videoId === videoId) {
          songIdx = i;
        }
      }
      return songIdx !== undefined
        ? {
          library: [
            ...library.slice(0, songIdx),
            ...library.slice(songIdx + 1)
          ]
        }
        : state;

    case REMOVE_SONG_FROM_LIBRARY_FAILURE:
      return state;

    default:
      return state;
  }
}
