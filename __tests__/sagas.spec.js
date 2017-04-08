import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import Spotify from 'spotify-web-api-js';
import axios from 'axios';

import * as action from '../src/app/actions';
import * as saga from '../src/app/sagas';

// const splitApi = jest.fn();
const spotifyApi = new Spotify();

describe('fetch user from spotify everything goes ok', () => {
  const it = sagaHelper(saga.fetchUser());
  const data = ['this', 'is', 'it'];

  it('should yield call to getMe method from spotify api', result => {
    expect(result).toEqual(call(spotifyApi.getMe));

    return data;
  });

  it('should yield put to spotifyMeSuccess with data from getMe', result => {
    expect(result).toEqual(put(action.spotifyMeSuccess(data)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch user from spotify fails', () => {
  const it = sagaHelper(saga.fetchUser());
  const error = new Error('This is an error');

  it('should yield call to getMe method from spotify api', result => {
    expect(result).toEqual(call(spotifyApi.getMe));

    return error;
  });

  it('should yield put to spotifyMeFailure with error message', result => {
    expect(result).toEqual(put(action.spotifyMeFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by lyrics everything is good', () => {
  const lyrics = 'These are the lyrics';
  const it = sagaHelper(saga.fetchSongByLyrics({ lyrics }));
  const data = { data: { this: 'is data' } };

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by lyrics api call', result => {
    expect(result).toEqual(call(axios.get, `/api/lyrics-search/${lyrics}/null`));

    return data;
  });

  it('should yield put to fetchSongVideoSuccess', result => {
    expect(result).toEqual(put(action.fetchSongVideoSuccess(data)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by lyrics failed on server', () => {
  const lyrics = 'These are the lyrics';
  const it = sagaHelper(saga.fetchSongByLyrics({ lyrics }));
  const data = { data: { failed: true } };
  const error = new Error('Failed to get song');

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by lyrics api call', result => {
    expect(result).toEqual(call(axios.get, `/api/lyrics-search/${lyrics}/null`));

    return data;
  });

  it('should yield put to fetchSongVideoSuccess', result => {
    expect(result).toEqual(put(
      action.fetchSongVideoFailure(error.message)
    ));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by lyrics failed on client', () => {
  const lyrics = 'These are the lyrics';
  const it = sagaHelper(saga.fetchSongByLyrics({ lyrics }));
  const error = new Error('This is an error');

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by lyrics api call', result => {
    expect(result).toEqual(call(axios.get, `/api/lyrics-search/${lyrics}/null`));

    return error;
  });

  it('should yield put to fetchSongVideoSuccess', result => {
    expect(result).toEqual(put(action.fetchSongVideoFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by name w/ artist succeeds', () => {
  const name = 'Some Song';
  const artist = 'Some Artist';
  const it = sagaHelper(saga.fetchSongByName({ name, artist }));
  const data = { data: { this: 'is data' } };

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by name api call', result => {
    expect(result).toEqual(call(axios.get, `/api/song-search/${name}/${artist}`));

    return data;
  });

  it('should yield put to fetchSongVideoSuccess with data', result => {
    expect(result).toEqual(put(action.fetchSongVideoSuccess(data)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by name w/o artist succeeds', () => {
  const name = 'Some Song';
  const it = sagaHelper(saga.fetchSongByName({ name }));
  const data = { data: { this: 'is data' } };

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by name api call', result => {
    expect(result).toEqual(call(axios.get, `/api/song-search/${name}/null`));

    return data;
  });

  it('should yield put to fetchSongVideoSuccess with data', result => {
    expect(result).toEqual(put(action.fetchSongVideoSuccess(data)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by name w/ artist fails on server', () => {
  const name = 'Some Song';
  const artist = 'Some Artist';
  const it = sagaHelper(saga.fetchSongByName({ name, artist }));
  const data = { data: { failed: true } };
  const error = new Error('Failed to get song');

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by name api call', result => {
    expect(result).toEqual(call(axios.get, `/api/song-search/${name}/${artist}`));

    return data;
  });

  it('should yield put to fetchSongVideoSuccess with data', result => {
    expect(result).toEqual(put(
      action.fetchSongVideoFailure(error.message)
    ));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by name w/o artist fails on server', () => {
  const name = 'Some Song';
  const it = sagaHelper(saga.fetchSongByName({ name }));
  const data = { data: { failed: true } };
  const error = new Error('Failed to get song');

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by name api call', result => {
    expect(result).toEqual(call(axios.get, `/api/song-search/${name}/null`));

    return data;
  });

  it('should yield put to fetchSongVideoSuccess with data', result => {
    expect(result).toEqual(put(
      action.fetchSongVideoFailure(error.message)
    ));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by name w/ artist fails on client', () => {
  const name = 'Some Song';
  const artist = 'Some Artist';
  const it = sagaHelper(saga.fetchSongByName({ name, artist }));
  const error = new Error('This is an error');

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by name api call', result => {
    expect(result).toEqual(call(axios.get, `/api/song-search/${name}/${artist}`));

    return error;
  });

  it('should yield put to fetchSongVideoSuccess with data', result => {
    expect(result).toEqual(put(action.fetchSongVideoFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song by name w/o artist fails on server', () => {
  const name = 'Some Song';
  const it = sagaHelper(saga.fetchSongByName({ name }));
  const error = new Error('This is an error');

  it('should yield put to fetch song loading', result => {
    expect(result).toEqual(put(action.fetchSongLoading()));
  });

  it('should yield call to song by name api call', result => {
    expect(result).toEqual(call(axios.get, `/api/song-search/${name}/null`));

    return error;
  });

  it('should yield put to fetchSongVideoSuccess with data', result => {
    expect(result).toEqual(put(action.fetchSongVideoFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('set spotify tokens success', () => {
  const accessToken = 'kl2n3rlkmclmkl23mlk23m4lkmlmsd';
  const refreshToken = '2l3klmkc90s9dcjosidclksmdcsdf';
  const tokens = { accessToken, refreshToken };
  const it = sagaHelper(saga.setSpotifyTokens(tokens));

  it('should yield put set tokens success', result => {
    expect(result).toEqual(put(action.setTokensSuccess(tokens)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('set spotify tokens fails', () => {
  const accessToken = null;
  const refreshToken = null;
  const it = sagaHelper(saga.setSpotifyTokens({ accessToken, refreshToken }));

  it('should yield put set tokens failure', result => {
    expect(result).toEqual(put(action.setTokensFailure()));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('add song to library succeeds', () => {
  const song = 'Some Song';
  const it = sagaHelper(saga.addSongToLibrary({ song }));
  const data = { data: { this: 'is data' }, status: 200 };

  it('should yield call to add to library api call', result => {
    expect(result).toEqual(call(axios.post, '/addToLibrary', song));

    return data;
  });

  it('should yield put to addSongToLibrarySuccess with data', result => {
    expect(result).toEqual(put(action.addSongToLibrarySuccess(data.data)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('add song to library fails with status code 500', () => {
  const song = 'Some Song';
  const it = sagaHelper(saga.addSongToLibrary({ song }));
  const data = { status: 500 };
  const error = new Error('Failed to add song to library');

  it('should yield call to add to library api call', result => {
    expect(result).toEqual(call(axios.post, '/addToLibrary', song));

    return data;
  });

  it('should yield to addSongToLibraryFailure with error', result => {
    expect(result).toEqual(put(action.addSongToLibraryFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('add song to library fails on client', () => {
  const song = 'Some Song';
  const it = sagaHelper(saga.addSongToLibrary({ song }));
  const error = new Error('This is an error');

  it('should yield call to add to library api call', result => {
    expect(result).toEqual(call(axios.post, '/addToLibrary', song));

    return error;
  });

  it('should yield to addSongToLibraryFailure with error', result => {
    expect(result).toEqual(put(action.addSongToLibraryFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song library succeeds', () => {
  const it = sagaHelper(saga.fetchLibrary());
  const data = { data: { this: 'is data' } };

  it('should yield call to fetch library api call', result => {
    expect(result).toEqual(call(axios.get, '/fetchLibrary'));

    return data;
  });

  it('should yield to fetch library success with data', result => {
    expect(result).toEqual(put(action.fetchLibrarySuccess(data.data)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song library fails at server', () => {
  const it = sagaHelper(saga.fetchLibrary());
  const data = { data: { failed: true } };
  const error = new Error('Failed to get songs from user\'s library');

  it('should yield call to fetch library api call', result => {
    expect(result).toEqual(call(axios.get, '/fetchLibrary'));

    return data;
  });

  it('should yield to fetch library failure with error', result => {
    expect(result).toEqual(put(action.fetchLibraryFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('fetch song library fails at client', () => {
  const it = sagaHelper(saga.fetchLibrary());
  const error = new Error('This is an error');

  it('should yield call to fetch library api call', result => {
    expect(result).toEqual(call(axios.get, '/fetchLibrary'));

    return error;
  });

  it('should yield to fetch library failure with error', result => {
    expect(result).toEqual(put(action.fetchLibraryFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('remove song from library succeeds', () => {
  const song = 'Some Song';
  const it = sagaHelper(saga.removeSongFromLibrary({ song }));
  const data = { data: { this: 'is data' }, status: 200 };

  it('should yield call to remove song from library api call', result => {
    expect(result).toEqual(call(axios.post, '/removeFromLibrary', song));

    return data;
  });

  it('should yield to removeSongFromLibrarySuccess with data', result => {
    expect(result).toEqual(put(action.removeSongFromLibrarySuccess(data.data)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('remove song from library fails with 500', () => {
  const song = 'Some Song';
  const it = sagaHelper(saga.removeSongFromLibrary({ song }));
  const data = { status: 500 };
  const error = new Error('Failed to remove song from library');

  it('should yield call to remove song from library api call', result => {
    expect(result).toEqual(call(axios.post, '/removeFromLibrary', song));

    return data;
  });

  it('should yield to removeSongFromLibraryFailure with error', result => {
    expect(result).toEqual(put(action.removeSongFromLibraryFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('remove song from library fails on client', () => {
  const song = 'Some Song';
  const it = sagaHelper(saga.removeSongFromLibrary({ song }));
  const error = new Error('This is an error');

  it('should yield call to remove song from library api call', result => {
    expect(result).toEqual(call(axios.post, '/removeFromLibrary', song));

    return error;
  });

  it('should yield to removeSongFromLibraryFailure with error', result => {
    expect(result).toEqual(put(action.removeSongFromLibraryFailure(error.message)));
  });

  it('and then nothing', result => {
    expect(result).toBeUndefined();
  });
});
