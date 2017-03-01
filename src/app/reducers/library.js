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
      let { library } = state;
      console.log('LIBRARY REDUCER - library:', library);
      console.log('LIBRARY REDUCER - adding to library song:', action.song);
      let newState = { library: [ ...library, action.song ] };
      console.log('LIBRARY REDUCER - newState:', newState);
      return newState;

    case ADD_SONG_TO_LIBRARY_FAILURE:
      return state;

    default:
      return state;
  }
}
