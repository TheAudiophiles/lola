import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rebass';

import mic from './mic-icon.png';

const Message = () => (
  <div className="speech-message">Lola is Listening . . .</div>
);

export default class Speech extends Component {
  constructor(props) {
    super(props);

    this.speech = require('../../speech_recognition');
    const { artyom, commands } = this.speech;

    artyom.addCommands(commands);

    this.state = {
      showClicked: false
    }
  }

  clickHandler = (e) => {
    e.preventDefault();

    this.speech.init();

    this.setState({showClicked: !this.state.showClicked})
  }

  render() {
    return (
      <div className="speech-icon">
        <a href="#" onClick={this.clickHandler.bind(this)}>
          <img src={mic} />
        </a>
      </div>
    );
  }
}
