import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InlineForm } from 'rebass';

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
      <InlineForm
        label="search lyrics"
        name="search_lyrics"
        onSubmit={this.handleSubmit}
        placeholder="input lyrics"
        rounded
        buttonLabel="Search"
        onChange={this.setInputText}
        value={this.state.inputText}
      />
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSongVideo }, dispatch);

export default connect(null, mapDispatchToProps)(Search);
