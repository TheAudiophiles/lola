import {
  TOGGLE_QUEUE,
  TOGGLE_LIBRARY
} from '../actions';

const initialState = {
  queueOn: true,
  libraryOn: false
};

export default function queueLibrary(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_QUEUE:
      return { queueOn: true, libraryOn: false}

    case TOGGLE_LIBRARY:
      return { queueOn: false, libraryOn: true}

    default:
      return state;
  }
}
