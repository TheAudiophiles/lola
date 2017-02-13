import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSongVideo } from '../../actions';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: ''
    };
  }

  setInputText = (e) => {
    this.setState({
      inputText: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.fetchSongVideo(this.state.inputText);
    this.setState({
      inputText: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.setInputText}
          value={this.state.inputText}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSongVideo }, dispatch);

export default connect(null, mapDispatchToProps)(Search);
