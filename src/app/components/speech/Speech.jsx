import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rebass';

import mic from './mic-icon.png';

export default class Speech extends Component {
  constructor(props) {
    super(props);

    this.speech = require('../../speech_recognition');
    const { artyom, commands } = this.speech;

    artyom.addCommands(commands);
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
