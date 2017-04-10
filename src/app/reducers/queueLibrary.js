import * as type from '../constants/types';

const initialState = {
  queueOn: true,
  libraryOn: false
};

export default function queueLibrary(state = initialState, action) {
  switch (action.type) {
    case type.TOGGLE_QUEUE:
      return { queueOn: true, libraryOn: false }

    case type.TOGGLE_LIBRARY:
      return { queueOn: false, libraryOn: true }

    default:
      return state;
  }
}
