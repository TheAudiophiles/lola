import reducer from '../src/app/reducers/queueLibrary';
import * as type from '../src/app/constants/types';

describe('queueLibrary reducer', () => {
  const initialState = {
    queueOn: true,
    libraryOn: false
  };

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle TOGGLE_QUEUE', () => {
    const beginState = {
      queueOn: false,
      libraryOn: true
    };
    expect(reducer(beginState, { type: type.TOGGLE_QUEUE })).toEqual(initialState);
  });

  it('should handle TOGGLE_LIBRARY', () => {
    const expectedState = {
      queueOn: false,
      libraryOn: true
    };
    expect(reducer(initialState, { type: type.TOGGLE_LIBRARY })).toEqual(expectedState);
  });
});
