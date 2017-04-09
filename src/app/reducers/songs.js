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
    case type.SEARCH_LYRICS_LOADING: {
      return { ...state, loading: true };
    }

    case type.SEARCH_LYRICS_SUCCESS: {
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
              searchResults,
              searchEmpty: false
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
        searchResults,
        searchEmpty: false
      };
    }

    case type.SEARCH_LYRICS_FAILURE: {
      return { ...state, loading: false };
    }

    case type.NEXT_SONG: {
      const prevSongIndex =
        state.currentSongIndex < state.allSongs.length - 1
          ? state.currentSongIndex + 1
          : state.currentSongIndex;
      return { ...state, currentSongIndex: prevSongIndex };
    }

    case type.PREVIOUS_SONG: {
      const nextSongIndex =
        state.currentSongIndex > 0
          ? state.currentSongIndex - 1
          : state.currentSongIndex;
      return { ...state, currentSongIndex: nextSongIndex };
    }

    case type.NAVIGATE_TO: {
      return { ...state, currentSongIndex: action.index };
    }

    case type.SELECT_SEARCH_RESULT: {
      const newSong = action.payload;
      const { allSongs, searchResults } = state;
      const newIndex = allSongs.length;
      const newSongVideoId = newSong.vid.items[0].id.videoId;

      // get index to remove song from search results
      const srIdx = searchResults.findIndex(song =>
        song.vid.items[0].id.videoId === newSongVideoId
      );

      return {
        ...state,
        allSongs: [
          ...allSongs,
          newSong
        ],
        currentSongIndex: newIndex,
        loading: false,
        searchResults: [
          ...searchResults.slice(0, srIdx),
          ...searchResults.slice(srIdx + 1)
        ]
      };
    }

    case type.REMOVE_FROM_QUEUE: {
      const { allSongs, currentSongIndex } = state;
      const { index } = action;
      const currIdx = index <= currentSongIndex
        ? currentSongIndex - 1
        : currentSongIndex;

      return {
        ...state,
        allSongs: [
          ...allSongs.slice(0, index),
          ...allSongs.slice(index + 1)
        ],
        currentSongIndex: currIdx
      };
    }

    case type.CLEAR_STATE:
    case type.CLEAR_QUEUE: {
      return initialState;
    }

    case type.SET_SONG: {
      const { album, artist, image, title, videoId } = action.song;
      const { allSongs } = state;
      const newSong = {
        vid: {
          items: [{
            id: { videoId }
          }]
        },
        track: {
          name: title,
          artist
        },
        details: {
          album: {
            name: album,
            images: [{ url: image }]
          },
          artists: [{ name: artist }],
          name: title
        }
      };

      // Code to check if video already exists. If so, don't add it
      // and change currentSongIndex to index where it exists.
      if (videoId) {
        for (let i = 0; i < allSongs.length; i++) {
          if (allSongs[i].vid.items[0].id.videoId === videoId) {
            return { ...state, currentSongIndex: i };
          }
        }
      }

      const newIndex = allSongs.length;

      return {
        ...state,
        allSongs: [
          ...allSongs,
          newSong
        ],
        currentSongIndex: newIndex
      };
    }

    default: {
      return state;
    }
  }
}
