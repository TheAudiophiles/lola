import {
  SPOTIFY_TOKENS_SUCCESS,
  SPOTIFY_TOKENS_FAILURE,
  SPOTIFY_ME_SUCCESS,
  SPOTIFY_ME_FAILURE,
  SPOTIFY_LOGOUT,
  RESET_LOGGEDOUT,
  CLEAR_STATE
} from '../actions';

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
    case SPOTIFY_TOKENS_SUCCESS:
      const { accessToken, refreshToken } = action;
      return {
        ...state,
        accessToken,
        refreshToken
      };

    case SPOTIFY_TOKENS_FAILURE:
      return {
        ...state,
        failed: true,
        loggedIn: false
      };

    // when we get the data merge it in
    case SPOTIFY_ME_SUCCESS:
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

    case SPOTIFY_ME_FAILURE:
      return {
        ...state,
        failed: true,
        loggedIn: false
      };

    case SPOTIFY_LOGOUT:
      return {
        ...initialState,
        loggedOut: true,
        loggedIn: false
      };

    case RESET_LOGGEDOUT:
      return {
        ...state,
        loggedOut: false
      };

    case CLEAR_STATE:
      return initialState;

    default:
      return state;
  }
}
