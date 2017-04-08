import * as type from '../constants/types';

const initialState = {
  allSongs: [],
  currentSongIndex: 0,
  searchResults: [],
  loading: false,
  searchEmpty: false
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case type.SEARCH_LYRICS_LOADING:
      return { ...state, loading: true };

    case type.SEARCH_LYRICS_SUCCESS:
      if (!action.payload.data || !action.payload.data.length) {
        return {
          ...state,
          searchEmpty: true
        };
      }

      const { allSongs } = state;
      const newSong = action.payload.data[0];
      let searchResults = action.payload.data.slice(1);

      // Check if video already exists in state. If so, don't add it
      // and change currentSongIndex to that index.
      if (newSong.vid) {
        for (let i = 0; i < allSongs.length; i++) {

          // check search results for songs that already exist in
          // allSongs. If it does, remove it from searchResults
          for (let j = 0; j < searchResults.length; j++) {
            if (
              searchResults[j].vid.items[0].id.videoId ===
              allSongs[i].vid.items[0].id.videoId
            ) {
              searchResults = [
                ...searchResults.slice(0, i),
                ...searchResults.slice(i + 1)
              ];
            }
          }

          if (
            allSongs[i].vid.items[0].id.videoId ===
            newSong.vid.items[0].id.videoId
          ) {
            return {
              ...state,
              currentSongIndex: i,
              loading: false,
              searchResults
            };
          }
        }
      }

      let newIndex = allSongs.length;
      return {
        allSongs: [
          ...allSongs,
          newSong
        ],
        currentSongIndex: newIndex,
        loading: false,
        searchResults
      };

    case type.SEARCH_LYRICS_FAILURE:
      return { ...state, loading: false };

    case type.NEXT_SONG:
      const prevSongIndex =
        state.currentSongIndex < state.allSongs.length - 1
          ? state.currentSongIndex + 1
          : state.currentSongIndex;
      return { ...state, currentSongIndex: prevSongIndex };

    case type.PREVIOUS_SONG:
      const nextSongIndex =
        state.currentSongIndex > 0
          ? state.currentSongIndex - 1
          : state.currentSongIndex;
      return { ...state, currentSongIndex: nextSongIndex };

    case type.NAVIGATE_TO:
      return { ...state, currentSongIndex: action.index };

    case type.SELECT_SR:
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

    case type.REMOVE_FROM_QUEUE:
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

    case type.CLEAR_STATE:
    case type.CLEAR_QUEUE:
      return initialState;

    case type.SET_SONG:
      // THEY CAN'T HANDLE THE TRUTH
      let newSongY = {
        vid: {
          items: [{
            id: {
              videoId: action.song.videoId
            }
          }]
        },
        track: {
          name: action.song.title,
          artist: action.song.artist
        },
        details: {
          album: {
            name: action.song.album,
            images: [{
              url: action.song.image
            }]
          },
          artists: [{
            name: action.song.artist
          }],
          name: action.song.title
        }
      }
      let allSongsY = state.allSongs;

      // Code to check if video already exists. If so, don't add it
      // and change currentSongIndex to index where it exists.

      // THIS RIGHT HERE...IS SOME BUGGITY SHIOT
      if (newSongY.vid) {
        for (let i = 0; i < allSongsY.length; i++) {
          if (
            allSongsY[i].vid.items[0].id.videoId ===
            newSongY.vid.items[0].id.videoId
          ) {
            return {
              ...state,
              currentSongIndex: i
            };
          }
        }
      }

      let newIndexY = allSongsY.length;
      return {
        ...state,
        allSongs: [
          ...allSongsY,
          newSongY
        ],
        currentSongIndex: newIndexY,
      };

    default:
      return state;
  }
}
