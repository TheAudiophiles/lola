import {
  SPOTIFY_TOKENS_SUCCESS,
  SPOTIFY_TOKENS_FAILURE,
  SPOTIFY_ME_SUCCESS,
  SPOTIFY_ME_FAILURE,
  SPOTIFY_LOGOUT
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
  loggedIn: true
};

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  switch (action.type) {
    // when we get the tokens... set the tokens!
    case SPOTIFY_TOKENS_SUCCESS:
      const { accessToken, refreshToken } = action;
      return Object.assign({}, state, { accessToken, refreshToken });

    case SPOTIFY_TOKENS_FAILURE:
      return Object.assign({}, state, { failed: true, loggedIn: false });

    // when we get the data merge it in
    case SPOTIFY_ME_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.payload, {
          loading: false
        }),
        failed: false,
        loggedIn: true
      });

    case SPOTIFY_ME_FAILURE:
      return Object.assign({}, state, { failed: true, loggedIn: false });

    case SPOTIFY_LOGOUT:
      return Object.assign({}, state, initialState, { loggedOut: true, loggedIn: false });

    default:
      return state;
  }
}
