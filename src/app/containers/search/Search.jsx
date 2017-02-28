import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, InlineForm } from 'rebass';

import { fetchSongVideo, fetchSongByName } from '../../actions';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songNameText: '',
      artistText: '',
      lyricsText: ''
    };
  }

  setSongNameText = (e) => this.setState({ songNameText: e.target.value });

  setArtistText = (e) => this.setState({ artistText: e.target.value });

  setLyricsText = (e) => this.setState({ lyricsText: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    const { songNameText, artistText, lyricsText } = this.state;

    if (!songNameText && !lyricsText) return;

    if (songNameText) {
      this.props.fetchSongByName(songNameText, artistText || 'null');
    } else {
      this.props.fetchSongVideo(lyricsText);
    }
    this.setState({
      songNameText: '',
      artistText: '',
      lyricsText: ''
    });
  }

  render() {
    return (
      <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Input
          label=""
          name="search_song_name"
          rounded
          type="text"
          placeholder="Song name"
          onChange={this.setSongNameText}
          value={this.state.songNameText}
        />
        <Input
          label=""
          name="search_artist"
          rounded
          type="text"
          placeholder="Artist"
          onChange={this.setArtistText}
          value={this.state.artistText}
        />
        <InlineForm
          label="search lyrics"
          name="search_lyrics"
          onSubmit={this.handleSubmit}
          placeholder="Lyrics"
          rounded
          buttonLabel="Search"
          onChange={this.setLyricsText}
          value={this.state.lyricsText}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSongVideo, fetchSongByName }, dispatch);

export default connect(null, mapDispatchToProps)(Search);
