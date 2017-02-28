import {
  ADD_SONG_TO_LIBRARY_SUCCESS,
  ADD_SONG_TO_LIBRARY_FAILURE
} from '../actions';

const initialState = {
  library: []
};

export default function library(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG_TO_LIBRARY_SUCCESS:
      return { library: [ ...library, action.song ] };

    case ADD_SONG_TO_LIBRARY_FAILURE:
      return state;

    default:
      return state;
  }
}
