import { bindActionCreators } from 'redux'
import artyomjs from 'artyom.js';

import {
  fetchSongByName,
  fetchSongVideo,
  addSongToLibrary,
  increaseVolume,
  decreaseVolume,
  mute,
  unmute,
  previousSong,
  nextSong,
  pauseSong,
  resumeSong
 } from '../actions';

import { store } from '../index.js';

const redux = bindActionCreators(
  {
    fetchSongByName,
    fetchSongVideo,
    addSongToLibrary,
    increaseVolume,
    decreaseVolume,
    mute,
    unmute,
    previousSong,
    nextSong,
    pauseSong,
    resumeSong
  }, store.dispatch);

export const artyom = artyomjs.ArtyomBuilder.getInstance();

export const commands = [
  {
    indexes: ['play *'],
    smart: true,
    action: (i, wildcard) => {
      let name, artist;
      if (wildcard.includes('by')) {
        let wildcards = wildcard.split('by');
        name = wildcards[0].trim();
        artist = wildcards[1].trim();
      } else {
        name = wildcard;
      }
      redux.fetchSongByName(name, artist);
    }
  },
  {
    indexes: ['song contains *'],
    smart:true,
    action: (i, wildcard) => {
      redux.fetchSongVideo(wildcard);
    }
  },
  {
    indexes: ['next song'],
    //smart: true,
    action:(i) => {
      redux.nextSong();
    }
  },
  {
    indexes: ['previous song', 'previous', 'previa'],
    //smart: true, 
    action:(i, wildcard) => {
      redux.previousSong();
    }
  },
  {
    indexes: ['resume song', 'resume', 'museum'], 
    action: (i) => {
      redux.resumeSong();
    }
  },
  {
    indexes: ['pause song', 'pause', 'paws', 'paws song', 'Pauls song'], 
    action: (i) => {
      console.log('in pause song');
      redux.pauseSong();
    }
  },
  {
    indexes:['add song to library'],
    action: (i) => {
      const { allSongs, currentSongIndex } = store.getState().songs;
      redux.addSongToLibrary(allSongs[currentSongIndex]);
    }
  },
  {
    indexes:['increase volume'],
    action: (i) => {
      redux.increaseVolume();
    }
  },
  {
    indexes:['decrease volume'],
    action: (i) => {
      redux.decreaseVolume();
    }
  },
  {
    indexes:['mute'],
    action: (i) => {
      redux.mute();
    }
  },
  {
    indexes:['unmute'],
    action: (i) => {
      redux.unmute();
    }
  }
];

export const init = () => {
  artyom.initialize({
    lang: "en-GB",
    soundex: true,
    debug: true,
    // obeyKeyword: 'lola',
    // executionKeyword: 'now',
    listen: true
  }).then(() => {
    console.log("Artyom has been succesfully initialized");
  }).catch((err) => {
    console.error("Artyom couldn't be initialized: ", err);
  });
};
