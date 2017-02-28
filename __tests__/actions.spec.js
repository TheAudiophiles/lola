import {
  SEARCH_SONG_NAME_BEGIN,
  SEARCH_LYRICS_BEGIN,
  SEARCH_LYRICS_LOADING,
  SEARCH_LYRICS_SUCCESS,
  SEARCH_LYRICS_FAILURE,
  PREVIOUS_SONG,
  NEXT_SONG,
  SELECT_SR,
  CLEAR_QUEUE,
  SPOTIFY_TOKENS_SUCCESS,
  SPOTIFY_TOKENS_FAILURE,
  SPOTIFY_ME_BEGIN,
  SPOTIFY_ME_SUCCESS,
  SPOTIFY_ME_FAILURE,
  SPOTIFY_LOGOUT,
  RESET_LOGGEDOUT,
  CLEAR_STATE,
  fetchSongByName,
  fetchSongVideo,
  fetchSongLoading,
  fetchSongVideoSuccess,
  fetchSongVideoFailure,
  previousSong,
  nextSong,
  getMyInfo,
  spotifyMeSuccess,
  spotifyMeFailure,
  setTokens,
  setTokensSuccess,
  setTokensFailure,
  spotifyLogout,
  resetLogout,
  selectSR,
  clearState,
  clearQueue
} from '../src/app/actions';

describe('actions', () => {
  it('should create an action to start song fetch by name w/o artist', () => {
    const name = 'All Along the Watchtower';
    const expectedAction = {
      type: SEARCH_SONG_NAME_BEGIN,
      name
    };
    expect(fetchSongByName(name)).toEqual(expectedAction);
  });

  it('should create an action to start song fetch by name w/ artist', () => {
    const name = 'All Along the Watchtower';
    const artist = 'Jimi Hendrix';
    const expectedAction = {
      type: SEARCH_SONG_NAME_BEGIN,
      name,
      artist
    };
    expect(fetchSongByName(name, artist)).toEqual(expectedAction);
  });

  it('should create an action to start song fetch by lyrics', () => {
    const lyrics = 'There must be some kind of way outta here Said the joker to the thief';
    const expectedAction = {
      type: SEARCH_LYRICS_BEGIN,
      lyrics
    };
    expect(fetchSongVideo(lyrics)).toEqual(expectedAction);
  });

  it('should create an action to show loading graphic while song is being requested', () => {
    const expectedAction = {
      type: SEARCH_LYRICS_LOADING,
    };
    expect(fetchSongLoading()).toEqual(expectedAction);
  });

  it('should create an action for successful retrieval of song video and data', () => {
    const payload = {
      data: [
        {
          vid: { id: 'asdfj3kk2dkc' },
          details: { name: 'All Along the Watchtower', artist: 'Jimi Hendrix' }
        },
        {
          vid: { id: 'kmlk23kj43ll' },
          details: { name: 'All Along the Watchtower', artist: 'Bob Dylan' }
        }
      ]
    };
    const expectedAction = {
      type: SEARCH_LYRICS_SUCCESS,
      payload
    }
    expect(fetchSongVideoSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action for failure of retrieval of song video and data', () => {
    const error = { failed: true };
    const expectedAction = {
      type: SEARCH_LYRICS_FAILURE,
      error
    };
    expect(fetchSongVideoFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to navigate to previous song', () => {
    const expectedAction = {
      type: PREVIOUS_SONG
    };
    expect(previousSong()).toEqual(expectedAction);
  });

  it('should create an action to navigate to next song', () => {
    const expectedAction = {
      type: NEXT_SONG
    };
    expect(nextSong()).toEqual(expectedAction);
  });

  it('should create an action to start to get spotify user info', () => {
    const expectedAction = {
      type: SPOTIFY_ME_BEGIN
    };
    expect(getMyInfo()).toEqual(expectedAction);
  });

  it('should create an action for successful retrieval of account info', () => {
    const payload = {
      username: 'user123',
      name: 'Bob',
      id: '123lkjxij23lk2skms22r3'
    };
    const expectedAction = {
      type: SPOTIFY_ME_SUCCESS,
      payload
    };
    expect(spotifyMeSuccess(payload)).toEqual(expectedAction);
  });
});
