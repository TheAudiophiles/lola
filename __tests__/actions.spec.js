import {
  SEARCH_SONG_NAME_BEGIN,
  SEARCH_LYRICS_BEGIN,
  SEARCH_LYRICS_LOADING,
  SEARCH_LYRICS_SUCCESS,
  SEARCH_LYRICS_FAILURE,
  PREVIOUS_SONG,
  NEXT_SONG,
  RESUME_SONG,
  PAUSE_SONG,
  NAVIGATE_TO,
  SPOTIFY_TOKENS,
  SPOTIFY_TOKENS_SUCCESS,
  SPOTIFY_TOKENS_FAILURE,
  SPOTIFY_ME_BEGIN,
  SPOTIFY_ME_SUCCESS,
  SPOTIFY_ME_FAILURE,
  SPOTIFY_LOGOUT,
  RESET_LOGGEDOUT,
  SELECT_SR,
  CLEAR_STATE,
  CLEAR_QUEUE,
  ADD_SONG_TO_LIBRARY_BEGIN,
  ADD_SONG_TO_LIBRARY_SUCCESS,
  ADD_SONG_TO_LIBRARY_FAILURE,
  INCREASE_VOLUME,
  DECREASE_VOLUME,
  MUTE,
  UNMUTE,
  RESET_VOLUME_CHANGE,
  REMOVE_FROM_QUEUE,
  fetchSongByName,
  fetchSongVideo,
  fetchSongLoading,
  fetchSongVideoSuccess,
  fetchSongVideoFailure,
  previousSong,
  nextSong,
  resumeSong,
  pauseSong,
  navigateTo,
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
  clearQueue,
  addSongToLibrary,
  addSongToLibrarySuccess,
  addSongToLibraryFailure,
  increaseVolume,
  decreaseVolume,
  mute,
  unmute,
  resetVolumeChange,
  removeFromQueue
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

  it('should create an action to resume paused song', () => {
    const expectedAction = {
      type: RESUME_SONG
    };
    expect(resumeSong()).toEqual(expectedAction);
  });

  it('should create an action to pause song', () => {
    const expectedAction = {
      type: PAUSE_SONG
    };
    expect(pauseSong()).toEqual(expectedAction);
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

  it('should create an action for failure of retrieval of account info', () => {
    const error = new Error("There was a problem or something.");
    const expectedAction = {
      type: SPOTIFY_ME_FAILURE,
      error
    };
    expect(spotifyMeFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to start to set spotify tokens to redux state', () => {
    const accessToken = "12kn3lkmnclaijsdlk1l2kemncoaioisdc90e3j";
    const refreshToken = "1ljcalkjxcoij09xij0o39ijojdkjlskclkzmscx";
    const expectedAction = {
      type: SPOTIFY_TOKENS,
      accessToken,
      refreshToken
    };
    expect(setTokens({ accessToken, refreshToken })).toEqual(expectedAction);
  });

  it('should create an action to set spotify tokens to redux state', () => {
    const accessToken = "12kn3lkmnclaijsdlk1l2kemncoaioisdc90e3j";
    const refreshToken = "1ljcalkjxcoij09xij0o39ijojdkjlskclkzmscx";
    const expectedAction = {
      type: SPOTIFY_TOKENS_SUCCESS,
      accessToken,
      refreshToken
    };
    expect(setTokensSuccess({ accessToken, refreshToken })).toEqual(expectedAction);
  });

  it('should create an action to signal that set tokens failed', () => {
    const expectedAction = {
      type: SPOTIFY_TOKENS_FAILURE
    };
    expect(setTokensFailure()).toEqual(expectedAction);
  });

  it('should create an action to logout from spotify', () => {
    const expectedAction = {
      type: SPOTIFY_LOGOUT
    };
    expect(spotifyLogout()).toEqual(expectedAction);
  });

  it('should create an action to reset logged out property in auth after logged out', () => {
    const expectedAction = {
      type: RESET_LOGGEDOUT
    };
    expect(resetLogout()).toEqual(expectedAction);
  });

  it('should create an action to change current song to selected result from search results', () => {
    const payload = {
      payloadExists: true
    };
    const expectedAction = {
      type: SELECT_SR,
      payload
    };
    expect(selectSR(payload)).toEqual(expectedAction);
  });

  it('should create an action to clear state', () => {
    const expectedAction = {
      type: CLEAR_STATE
    };
    expect(clearState()).toEqual(expectedAction);
  });

  it('should create an action to clear queue', () => {
    const expectedAction = {
      type: CLEAR_QUEUE
    };
    expect(clearQueue()).toEqual(expectedAction);
  });

  it('should create an action to start to add song to library', () => {
    const song = {
      name: 'Loser',
      artist: 'Beck',
      album: 'Mellow Gold',
      id: 'askl21elkmsclkmsd'
    };
    const expectedAction = {
      type: ADD_SONG_TO_LIBRARY_BEGIN,
      song
    };
    expect(addSongToLibrary(song)).toEqual(expectedAction);
  });

  it('should create an action to finish adding song to library', () => {
    const song = {
      name: 'Loser',
      artist: 'Beck',
      album: 'Mellow Gold',
      id: 'askl21elkmsclkmsd'
    };
    const expectedAction = {
      type: ADD_SONG_TO_LIBRARY_SUCCESS,
      song
    };
    expect(addSongToLibrarySuccess(song)).toEqual(expectedAction);
  });

  it('should create an action if failed to add song to library', () => {
    const error = new Error('Failed to add song');
    const expectedAction = {
      type: ADD_SONG_TO_LIBRARY_FAILURE,
      error
    };
    expect(addSongToLibraryFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to increase volume', () => {
    const expectedAction = {
      type: INCREASE_VOLUME
    };
    expect(increaseVolume()).toEqual(expectedAction);
  });

  it('should create an action to decrease volume', () => {
    const expectedAction = {
      type: DECREASE_VOLUME
    };
    expect(decreaseVolume()).toEqual(expectedAction);
  });

  it('should create an action to mute song', () => {
    const expectedAction = {
      type: MUTE
    };
    expect(mute()).toEqual(expectedAction);
  });

  it('should create an action to unmute song', () => {
    const expectedAction = {
      type: UNMUTE
    };
    expect(unmute()).toEqual(expectedAction);
  });

  it('should create an action to reset volume', () => {
    const expectedAction = {
      type: RESET_VOLUME_CHANGE
    };
    expect(resetVolumeChange()).toEqual(expectedAction);
  });

  it('should create an action to remove song from queue', () => {
    const index = 5;
    const expectedAction = {
      type: REMOVE_FROM_QUEUE,
      index
    };
    expect(removeFromQueue(index)).toEqual(expectedAction);
  });
});
