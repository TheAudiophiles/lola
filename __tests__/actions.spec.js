import * as type from '../src/app/constants/types';
import * as action from '../src/app/actions';

describe('actions', () => {
  it('should create an action to start song fetch by name w/o artist', () => {
    const name = 'All Along the Watchtower';
    const expectedAction = {
      type: type.SEARCH_SONG_NAME_BEGIN,
      name
    };
    expect(action.fetchSongByName(name)).toEqual(expectedAction);
  });

  it('should create an action to start song fetch by name w/ artist', () => {
    const name = 'All Along the Watchtower';
    const artist = 'Jimi Hendrix';
    const expectedAction = {
      type: type.SEARCH_SONG_NAME_BEGIN,
      name,
      artist
    };
    expect(action.fetchSongByName(name, artist)).toEqual(expectedAction);
  });

  it('should create an action to start song fetch by lyrics', () => {
    const lyrics = 'There must be some kind of way outta here Said the joker to the thief';
    const expectedAction = {
      type: type.SEARCH_LYRICS_BEGIN,
      lyrics
    };
    expect(action.fetchSongVideo(lyrics)).toEqual(expectedAction);
  });

  it('should create an action to show loading graphic while song is being requested', () => {
    const expectedAction = {
      type: type.SEARCH_LYRICS_LOADING,
    };
    expect(action.fetchSongLoading()).toEqual(expectedAction);
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
      type: type.SEARCH_LYRICS_SUCCESS,
      payload
    }
    expect(action.fetchSongVideoSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action for failure of retrieval of song video and data', () => {
    const error = { failed: true };
    const expectedAction = {
      type: type.SEARCH_LYRICS_FAILURE,
      error
    };
    expect(action.fetchSongVideoFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to navigate to previous song', () => {
    const expectedAction = {
      type: type.PREVIOUS_SONG
    };
    expect(action.previousSong()).toEqual(expectedAction);
  });

  it('should create an action to navigate to next song', () => {
    const expectedAction = {
      type: type.NEXT_SONG
    };
    expect(action.nextSong()).toEqual(expectedAction);
  });

  it('should create an action to resume paused song', () => {
    const expectedAction = {
      type: type.RESUME_SONG
    };
    expect(action.resumeSong()).toEqual(expectedAction);
  });

  it('should create an action to pause song', () => {
    const expectedAction = {
      type: type.PAUSE_SONG
    };
    expect(action.pauseSong()).toEqual(expectedAction);
  });

  it('should create an action to start to get spotify user info', () => {
    const expectedAction = {
      type: type.SPOTIFY_ME_BEGIN
    };
    expect(action.getMyInfo()).toEqual(expectedAction);
  });

  it('should create an action for successful retrieval of account info', () => {
    const payload = {
      username: 'user123',
      name: 'Bob',
      id: '123lkjxij23lk2skms22r3'
    };
    const expectedAction = {
      type: type.SPOTIFY_ME_SUCCESS,
      payload
    };
    expect(action.spotifyMeSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action for failure of retrieval of account info', () => {
    const error = new Error("There was a problem or something.");
    const expectedAction = {
      type: type.SPOTIFY_ME_FAILURE,
      error
    };
    expect(action.spotifyMeFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to start to set spotify tokens to redux state', () => {
    const accessToken = "12kn3lkmnclaijsdlk1l2kemncoaioisdc90e3j";
    const refreshToken = "1ljcalkjxcoij09xij0o39ijojdkjlskclkzmscx";
    const expectedAction = {
      type: type.SPOTIFY_TOKENS,
      accessToken,
      refreshToken
    };
    expect(action.setTokens({ accessToken, refreshToken })).toEqual(expectedAction);
  });

  it('should create an action to set spotify tokens to redux state', () => {
    const accessToken = "12kn3lkmnclaijsdlk1l2kemncoaioisdc90e3j";
    const refreshToken = "1ljcalkjxcoij09xij0o39ijojdkjlskclkzmscx";
    const expectedAction = {
      type: type.SPOTIFY_TOKENS_SUCCESS,
      accessToken,
      refreshToken
    };
    expect(action.setTokensSuccess({
      accessToken, refreshToken
    })).toEqual(expectedAction);
  });

  it('should create an action to signal that set tokens failed', () => {
    const expectedAction = {
      type: type.SPOTIFY_TOKENS_FAILURE
    };
    expect(action.setTokensFailure()).toEqual(expectedAction);
  });

  it('should create an action to logout from spotify', () => {
    const expectedAction = {
      type: type.SPOTIFY_LOGOUT
    };
    expect(action.spotifyLogout()).toEqual(expectedAction);
  });

  it('should create an action to reset logged out property in auth after logged out', () => {
    const expectedAction = {
      type: type.RESET_LOGGEDOUT
    };
    expect(action.resetLogout()).toEqual(expectedAction);
  });

  it('should create an action to change current song to selected result from search results', () => {
    const payload = {
      payloadExists: true
    };
    const expectedAction = {
      type: type.SELECT_SR,
      payload
    };
    expect(action.selectSR(payload)).toEqual(expectedAction);
  });

  it('should create an action to clear state', () => {
    const expectedAction = {
      type: type.CLEAR_STATE
    };
    expect(action.clearState()).toEqual(expectedAction);
  });

  it('should create an action to clear queue', () => {
    const expectedAction = {
      type: type.CLEAR_QUEUE
    };
    expect(action.clearQueue()).toEqual(expectedAction);
  });

  it('should create an action to start to add song to library', () => {
    const song = {
      name: 'Loser',
      artist: 'Beck',
      album: 'Mellow Gold',
      id: 'askl21elkmsclkmsd'
    };
    const expectedAction = {
      type: type.ADD_SONG_TO_LIBRARY_BEGIN,
      song
    };
    expect(action.addSongToLibrary(song)).toEqual(expectedAction);
  });

  it('should create an action to finish adding song to library', () => {
    const song = {
      name: 'Loser',
      artist: 'Beck',
      album: 'Mellow Gold',
      id: 'askl21elkmsclkmsd'
    };
    const expectedAction = {
      type: type.ADD_SONG_TO_LIBRARY_SUCCESS,
      song
    };
    expect(action.addSongToLibrarySuccess(song)).toEqual(expectedAction);
  });

  it('should create an action if failed to add song to library', () => {
    const error = new Error('Failed to add song');
    const expectedAction = {
      type: type.ADD_SONG_TO_LIBRARY_FAILURE,
      error
    };
    expect(action.addSongToLibraryFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to increase volume', () => {
    const expectedAction = {
      type: type.INCREASE_VOLUME
    };
    expect(action.increaseVolume()).toEqual(expectedAction);
  });

  it('should create an action to decrease volume', () => {
    const expectedAction = {
      type: type.DECREASE_VOLUME
    };
    expect(action.decreaseVolume()).toEqual(expectedAction);
  });

  it('should create an action to mute song', () => {
    const expectedAction = {
      type: type.MUTE
    };
    expect(action.mute()).toEqual(expectedAction);
  });

  it('should create an action to unmute song', () => {
    const expectedAction = {
      type: type.UNMUTE
    };
    expect(action.unmute()).toEqual(expectedAction);
  });

  it('should create an action to reset volume', () => {
    const expectedAction = {
      type: type.RESET_VOLUME_CHANGE
    };
    expect(action.resetVolumeChange()).toEqual(expectedAction);
  });

  it('should create an action to remove song from queue', () => {
    const index = 5;
    const expectedAction = {
      type: type.REMOVE_FROM_QUEUE,
      index
    };
    expect(action.removeFromQueue(index)).toEqual(expectedAction);
  });

  it('should create an action to reset addFailed in library state', () => {
    const expectedAction = {
      type: type.RESET_LIBRARY_ADD_FAILED
    };
    expect(action.resetLibraryAddFailed()).toEqual(expectedAction);
  });

  it('should create an action to reset removeFailed in library state', () => {
    const expectedAction = {
      type: type.RESET_LIBRARY_REMOVE_FAILED
    };
    expect(action.resetLibraryRemoveFailed()).toEqual(expectedAction);
  });
});
