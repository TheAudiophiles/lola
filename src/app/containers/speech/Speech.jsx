import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rebass';
import artyomjs from 'artyom.js';
import mic from './mic-icon.png';

import { fetchSongVideo, fetchSongByName, previousSong, nextSong, resumeSong, stopSong, pauseSong } from '../../actions';

const artyom = artyomjs.ArtyomBuilder.getInstance();

class Speech extends Component {
  constructor(props) {
    super(props);

    this.speech = require('../../speech_recognition');

    artyom.addCommands(this.speech.commands);
  }

  clickHandler = (e) => {
    e.preventDefault();

    this.speech.init();
  }

  render() {
    return (
      <a href="#" onClick={this.clickHandler}>
        <img src={mic} />
      </a>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSongVideo, fetchSongByName, previousSong, nextSong, resumeSong, stopSong, pauseSong }, dispatch);

export default connect(null, mapDispatchToProps)(Speech);
