import {
  INCREASE_VOLUME,
  DECREASE_VOLUME,
  MUTE,
  UNMUTE,
  RESET_VOLUME_CHANGE,
  PAUSE_SONG,
  PREVIOUS_SONG,
  NEXT_SONG,
  RESUME_SONG,
  STOP_SONG
} from '../actions';

const initialState = {
  isPlaying: true,
  muted: false,
  volumeChange: { status: false, direction: null }
};

export default function audioPlayer(state = initialState, action) {
  switch (action.type) {
    case INCREASE_VOLUME:
      return { ...state, volumeChange: { status: true, direction: 'up' } };

    case DECREASE_VOLUME:
      return { ...state, volumeChange: { status: true, direction: 'down' } };

    case RESET_VOLUME_CHANGE:
      return { ...state, volumeChange: { status: false, direction: null } };

    case MUTE:
      return { ...state, muted: true };

    case UNMUTE:
      return { ...state, muted: false };

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


    case RESUME_SONG:
      return {...state, isPlaying: true};

    case PAUSE_SONG:
      return {...state, isPlaying: false};

    default:
      return state;
  }
}
