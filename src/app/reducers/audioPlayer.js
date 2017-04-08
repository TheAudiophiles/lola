import * as type from '../constants/types';

const initialState = {
  isPlaying: true,
  muted: false,
  volumeChange: { status: false, direction: null }
};

export default function audioPlayer(state = initialState, action) {
  switch (action.type) {
    case type.INCREASE_VOLUME:
      return { ...state, volumeChange: { status: true, direction: 'up' } };

    case type.DECREASE_VOLUME:
      return { ...state, volumeChange: { status: true, direction: 'down' } };

    case type.RESET_VOLUME_CHANGE:
      return { ...state, volumeChange: { status: false, direction: null } };

    case type.MUTE:
      return { ...state, muted: true };

    case type.UNMUTE:
      return { ...state, muted: false };

    case type.RESUME_SONG:
      return {...state, isPlaying: true};

    case type.PAUSE_SONG:
      return {...state, isPlaying: false};

    default:
      return state;
  }
}
