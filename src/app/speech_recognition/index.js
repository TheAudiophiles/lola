import { bindActionCreators } from 'redux'
import artyomjs from 'artyom.js';
import { fetchSongByName, fetchSongVideo, previousSong, nextSong } from '../actions';

import { store } from '../index.js';

const redux = bindActionCreators({ fetchSongByName, fetchSongVideo, previousSong, nextSong }, store.dispatch);

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
    indexes: ['play next song'], 
    smart: true,
    action:(i) => {
      redux.nextSong(i);
    }
  }, 
  {
    indexes: ['previous song'],
    smart: true, 
    action:(i) => {
      redux.previousSong(i);
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
