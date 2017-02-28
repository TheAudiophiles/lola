import { bindActionCreators } from 'redux'
import artyomjs from 'artyom.js';
import { fetchSongByName, fetchSongVideo, previousSong, nextSong, pauseSong, stopSong, resumeSong } from '../actions';

import { store } from '../index.js';

const redux = bindActionCreators({ fetchSongByName, fetchSongVideo, previousSong, nextSong, pauseSong, stopSong, resumeSong }, store.dispatch);

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
      console.log('in next song');
      redux.nextSong();
    }
  }, 
  {
    indexes: ['previous song'],
    //smart: true, 
    action:(i, wildcard) => {
      console.log('in previousSong');
      redux.previousSong();
    }
  }, 
  {
    indexes: ['resume song'], 
    action: (i) => {
      console.log('in resume song');
      redux.resumeSong();
    }
  }, 
  {
    indexes: ['pause song'], 
    action: (i) => {
      console.log('in pause song');
      redux.pauseSong();
    }
  }, 
  {
    indexes: ['stop song'],
    action: (i) => {
      console.log('in stop song');
      redux.stopSong();
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
