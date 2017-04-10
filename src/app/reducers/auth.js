import * as type from '../constants/types';

/** The initial state; no tokens and no user info */
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

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  switch (action.type) {
    // when we get the tokens... set the tokens!
    case type.SPOTIFY_TOKENS_SUCCESS:
      const { accessToken, refreshToken } = action;
      return {
        ...state,
        accessToken,
        refreshToken
      };

    case type.SPOTIFY_TOKENS_FAILURE:
      return {
        ...state,
        failed: true,
        loggedIn: false
      };

    // when we get the data merge it in
    case type.SPOTIFY_ME_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          loading: false
        },
        failed: false,
        loggedIn: true
      };

    case type.SPOTIFY_ME_FAILURE:
      return {
        ...state,
        failed: true,
        loggedIn: false
      };

    case type.SPOTIFY_LOGOUT:
      return {
        ...initialState,
        loggedOut: true,
        loggedIn: false
      };

    case type.RESET_LOGGEDOUT:
      return {
        ...state,
        loggedOut: false
      };

    case type.CLEAR_STATE:
      return initialState;

    default:
      return state;
  }
}
