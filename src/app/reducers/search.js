import {
  SEARCH_LYRICS_LOADING,
  SEARCH_LYRICS_SUCCESS,
  SEARCH_LYRICS_FAILURE,
  PREVIOUS_SONG,
  NEXT_SONG
} from '../actions';

const initialState = {
  allSongs: [],
  currentSongIndex: 0,
  loading: false
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LYRICS_LOADING:
      return { ...state, loading: true };

    case SEARCH_LYRICS_SUCCESS:
      const newSong = action.payload.data;
      const { allSongs } = state;
      console.log('INSIDE SEARCH_LYRICS_SUCCESS REDUCER:', newSong);

      // Code to check if video already exists. If so, don't add it
      // and change currentSongIndex to existing index. Commented
      // out atm due to issues with the control buttons not getting
      // disabled.

      // if (newSong.ytData) {
      //   for (let i in allSongs) {
      //     if (
      //       allSongs[i].ytData.items[0].id.videoId ===
      //       newSong.ytData.items[0].id.videoId
      //     ) {
      //       return {
      //         allSongs,
      //         currentSongIndex: i,
      //         loading: false
      //       };
      //     }
      //   }
      // }
      
      const newIndex = allSongs.length;
      return {
        allSongs: [
          ...allSongs,
          newSong
        ],
        currentSongIndex: newIndex,
        loading: false
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

    default:
      return state;
  }
}
