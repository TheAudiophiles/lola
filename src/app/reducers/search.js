import {
  SEARCH_LYRICS_SUCCESS,
  SEARCH_LYRICS_FAILURE,
  PREVIOUS_SONG,
  NEXT_SONG
} from '../actions';

const initialState = {
  allSongs: [],
  currentSongIndex: 0
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LYRICS_SUCCESS:
      const newIndex = state.allSongs.length;
      return {
        allSongs: [
          ...state.allSongs,
          action.payload.data.items[0]
        ],
        currentSongIndex: newIndex
      };

    case SEARCH_LYRICS_FAILURE:
      return state;

    case NEXT_SONG:
      const prevSongIndex =
        state.currentSongIndex < state.allSongs.length - 1
          ? state.currentSongIndex + 1
          : state.currentSongIndex;
      return Object.assign({}, state, { currentSongIndex: prevSongIndex });

    case PREVIOUS_SONG:
      const nextSongIndex =
        state.currentSongIndex > 0
          ? state.currentSongIndex - 1
          : state.currentSongIndex;
      return Object.assign({}, state, { currentSongIndex: nextSongIndex });

    default:
      return state;
  }
}
