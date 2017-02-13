import { SEARCH_BY_LYRICS } from '../actions';

export default function search(state = [], action) {
  switch (action.type) {
    case SEARCH_BY_LYRICS:
      return [
        ...state,
        action.payload.data.items[0]
      ];
    default:
      return state;
  }
}
