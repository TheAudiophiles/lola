import {
  ADD_SONG_TO_LIBRARY_SUCCESS,
  ADD_SONG_TO_LIBRARY_FAILURE,
  FETCH_LIBRARY_SUCCESS,
  FETCH_LIBRARY_FAILURE
} from '../actions';

const initialState = {
  library: []
};

export default function library(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG_TO_LIBRARY_SUCCESS:
      let { library } = state;
      return { library: [ ...library, action.song ] };

    case ADD_SONG_TO_LIBRARY_FAILURE:
      return state;

    case FETCH_LIBRARY_SUCCESS:
      return { library: action.librarySongs };

    case ADD_SONG_TO_LIBRARY_FAILURE:
      return state;

    default:
      return state;
  }
}
