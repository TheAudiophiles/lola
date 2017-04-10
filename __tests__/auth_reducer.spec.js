import reducer from '../src/app/reducers/auth';
import * as type from '../src/app/constants/types';

describe('auth reducer', () => {
  const initialState = {
    accessToken: null,
    refreshToken: null,
    user: {
      loading: false,
      country: null,
      display_name: null,
      email: null,
      external_urls: {},
      followers: {},
      href: null,
      id: null,
      images: [],
      product: null,
      type: null,
      uri: null,
    },
    loggedOut: false,
    failed: false,
    loggedIn: false
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SPOTIFY_TOKENS_SUCCESS', () => {
    const accessToken = '12elkndlakmsldkjalskej12ed';
    const refreshToken = 'd09cjksodfj093jljsdlfkjsl2';
    const expectedState = {
      ...initialState,
      accessToken,
      refreshToken
    };
    expect(reducer(
      initialState,
      {
        type: type.SPOTIFY_TOKENS_SUCCESS,
        accessToken,
        refreshToken
      }
    )).toEqual(expectedState);
  });

  it('should handle SPOTIFY_TOKENS_FAILURE', () => {
    const expectedState = {
      ...initialState,
      failed: true,
      loggedIn: false
    };
    expect(reducer(initialState, {
      type: type.SPOTIFY_TOKENS_FAILURE
    })).toEqual(expectedState);
  });

  it('should handle SPOTIFY_LOGOUT', () => {
    const expectedState = {
      ...initialState,
      loggedOut: true,
      loggedIn: false
    };
    expect(reducer(undefined, {
      type: type.SPOTIFY_LOGOUT
    })).toEqual(expectedState);
  });

  it('should handle RESET_LOGGEDOUT', () => {
    const beginState = {
      ...initialState,
      loggedOut: true,
      loggedIn: false
    };
    const expectedState = {
      ...beginState,
      loggedOut: false
    };
    expect(reducer(beginState, {
      type: type.RESET_LOGGEDOUT
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_STATE', () => {
    const beginState = {
      accessToken: 'oijacodijcolm2lkem1l2ekmlaksd',
      refreshToken: '12smlsklkasdkj2slkjaskdlasdjd',
      user: {
        loading: false,
        country: 'US',
        display_name: 'Bob Smith',
        email: 'bob@smith.com',
        external_urls: {},
        followers: {},
        href: null,
        id: 'asdfkjlkj3dkmc92jd',
        images: [],
        product: null,
        type: null,
        uri: null,
      },
      loggedOut: false,
      failed: false,
      loggedIn: false
    };
    expect(reducer(beginState, { type: type.CLEAR_STATE })).toEqual(initialState);
  });
});
