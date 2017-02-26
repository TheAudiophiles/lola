import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rebass';
import artyomjs from 'artyom.js';

import { fetchSongVideo, fetchSongByName } from '../../actions';

const artyom = artyomjs.ArtyomBuilder.getInstance();

class Speech extends Component {
  constructor(props) {
    super(props);

    this.speech = require('../../speech_recognition');

    artyom.addCommands(this.speech.commands);
  }

  clickHandler = (e) => {
    this.speech.init();
  }

  render() {
    return (
      <Button
        backgroundColor="primary"
        color="white"
        inverted
        rounded
        onClick={this.clickHandler}>
        Speak
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSongVideo, fetchSongByName }, dispatch);

export default connect(null, mapDispatchToProps)(Speech);
