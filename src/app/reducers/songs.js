import {
  SEARCH_LYRICS_LOADING,
  SEARCH_LYRICS_SUCCESS,
  SEARCH_LYRICS_FAILURE,
  NAVIGATE_TO,
  PREVIOUS_SONG,
  NEXT_SONG,
  SELECT_SR,
  CLEAR_STATE,
  CLEAR_QUEUE,
  REMOVE_FROM_QUEUE
} from '../actions';

const initialState = {
  allSongs: [],
  currentSongIndex: 0,
  searchResults: [],
  loading: false,
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LYRICS_LOADING:
      return { ...state, loading: true };

    case SEARCH_LYRICS_SUCCESS:
      const newSong = action.payload.data[0];
      const { allSongs } = state;
      const searchResults = action.payload.data.slice(1);
      // Code to check if video already exists. If so, don't add it
      // and change currentSongIndex to index where it exists.

      if (newSong.ytData) {
        for (let i = 0; i < allSongs.length; i++) {
          if (
            allSongs[i].ytData.items[0].id.videoId ===
            newSong.ytData.items[0].id.videoId
          ) {
            return {
              allSongs,
              currentSongIndex: i,
              loading: false
            };
          }
        }
      }

      const newIndex = allSongs.length;
      return {
        allSongs: [
          ...allSongs,
          newSong
        ],
        currentSongIndex: newIndex,
        loading: false,
        searchResults: searchResults
      };

    case SEARCH_LYRICS_FAILURE:
      return { ...state, loading: false };

    case NEXT_SONG:
      const prevSongIndex =
        state.currentSongIndex < state.allSongs.length - 1
          ? state.currentSongIndex + 1
          : state.currentSongIndex;
      return { ...state, currentSongIndex: prevSongIndex };

    case PREVIOUS_SONG:
      const nextSongIndex =
        state.currentSongIndex > 0
          ? state.currentSongIndex - 1
          : state.currentSongIndex;
      return { ...state, currentSongIndex: nextSongIndex };

    case NAVIGATE_TO:
      return { ...state, currentSongIndex: action.index };

    case SELECT_SR:
      const newSongX = action.payload;
      const allSongsX = state.allSongs;
      const newIndexX = allSongsX.length;
      return { allSongs: [
          ...allSongsX,
          newSongX
        ],
        currentSongIndex: newIndexX,
        loading: false,
        searchResults: [] // clear search results
      };

    case REMOVE_FROM_QUEUE:
      const currIdx = action.index <= state.currentSongIndex
        ? state.currentSongIndex - 1
        : state.currentSongIndex;

      return {
        ...state,
        allSongs: [
          ...state.allSongs.slice(0, action.index),
          ...state.allSongs.slice(action.index + 1)
        ],
        currentSongIndex: currIdx
      };

    case CLEAR_STATE:
    case CLEAR_QUEUE:
      return initialState;

    default:
      return state;
  }
}
