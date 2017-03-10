import reducer from '../src/app/reducers/audioPlayer';

import {
  INCREASE_VOLUME,
  DECREASE_VOLUME,
  MUTE,
  UNMUTE,
  RESET_VOLUME_CHANGE,
  PAUSE_SONG,
  RESUME_SONG
} from '../src/app/actions';

describe('audioPlayer reducer', () => {
  const initialState = {
    isPlaying: true,
    muted: false,
    volumeChange: { status: false, direction: null }
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle INCREASE_VOLUME', () => {
    const expectedState = {
      isPlaying: true,
      muted: false,
      volumeChange: { status: true, direction: 'up' }
    };
    expect(reducer(initialState, { type: INCREASE_VOLUME })).toEqual(expectedState);
  });

  it('should handle DECREASE_VOLUME', () => {
    const expectedState = {
      isPlaying: true,
      muted: false,
      volumeChange: { status: true, direction: 'down' }
    };
    expect(reducer(initialState, { type: DECREASE_VOLUME })).toEqual(expectedState);
  });

  it('should handle RESET_VOLUME_CHANGE', () => {
    const beginState = {
      isPlaying: true,
      muted: false,
      volumeChange: { status: true, direction: 'down' }
    };
    expect(reducer(beginState, { type: RESET_VOLUME_CHANGE })).toEqual(initialState);
  });

  it('should handle MUTE', () => {
    const expectedState = {
      isPlaying: true,
      muted: true,
      volumeChange: { status: false, direction: null }
    };
    expect(reducer(initialState, { type: MUTE })).toEqual(expectedState);
  });

  it('should handle UNMUTE', () => {
    const beginState = {
      isPlaying: true,
      muted: true,
      volumeChange: { status: false, direction: null }
    };
    expect(reducer(beginState, { type: UNMUTE })).toEqual(initialState);
  });

  it('should handle RESUME_SONG', () => {
    const beginState = {
      isPlaying: false,
      muted: false,
      volumeChange: { status: false, direction: null }
    };
    expect(reducer(beginState, { type: RESUME_SONG })).toEqual(initialState);
  });

  it('should handle PAUSE_SONG', () => {
    const expectedState = {
      isPlaying: false,
      muted: false,
      volumeChange: { status: false, direction: null }
    };
    expect(reducer(initialState, { type: PAUSE_SONG })).toEqual(expectedState);
  });
});
