import {
  SEARCH_LYRICS_LOADING,
  SEARCH_LYRICS_SUCCESS,
  SEARCH_LYRICS_FAILURE,
  PREVIOUS_SONG,
  NEXT_SONG,
  RESUME_SONG, 
  STOP_SONG, 
  PAUSE_SONG,
  SELECT_SR
} from '../actions';

import playPause from '../containers/audio_player/AudioPlayer';

const initialState = {
  allSongs: [],
  currentSongIndex: 0,
  searchResults: [],
  loading: false
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LYRICS_LOADING:
      return { ...state, loading: true };

    case SEARCH_LYRICS_SUCCESS:
      const newSong = action.payload.data[0];
      const { allSongs } = state;
      const searchResults = action.payload.data.slice(1);
      console.log('This is searchResults action payload:', action.payload)
      console.log('SEARCH_LYRICS_SUCCESS REDUCER - newSong:', newSong);
      console.log('SEARCH_LYRICS_SUCCESS REDUCER - searchResults:', searchResults);

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

    // case RESUME_SONG: 
    
    // case STOP_SONG:

    case PAUSE_SONG:
      console.log('song has been paused'); 
      console.log('this is action:', action)
      return{...state}

    case SELECT_SR:
      const newSongX = action.payload;
      console.log('action.payload:',  action.payload);
      const allSongsX = state.allSongs;
      const newIndexX = allSongsX.length;
      console.log('SELECT SR REDUCER - newSong:', newSong);
      return { allSongs: [
          ...allSongsX,
          newSongX
        ],
        currentSongIndex: newIndexX,
        loading: false,
        searchResults: [] // clear search results
      };  

    default:
      return state;
  }
}
