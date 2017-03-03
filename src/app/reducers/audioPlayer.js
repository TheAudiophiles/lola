import {
  INCREASE_VOLUME,
  DECREASE_VOLUME,
  MUTE,
  UNMUTE,
  RESET_VOLUME_CHANGE,
  PAUSE_SONG,
  RESUME_SONG
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

    case RESUME_SONG:
      return {...state, isPlaying: true};

    case PAUSE_SONG:
      return {...state, isPlaying: false};

    default:
      return state;
  }
}
