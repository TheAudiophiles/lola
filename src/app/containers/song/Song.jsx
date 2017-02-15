import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';
import { ButtonCircle } from 'rebass';
import YouTube from 'react-youtube';
import Icon from 'react-geomicons';

import { previousSong, nextSong } from '../../actions';

class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSong: {}
    };
  }

  _onReady = (e) => {
    this.setState({
      currentSong: e.target
    });
  }

  toPreviousSong = (e) => {
    this.props.previousSong();
  }

  pauseSong = (e) => {
    this.state.currentSong.pauseVideo();
  }

  playSong = (e) => {
    this.state.currentSong.playVideo();
  }

  toNextSong = (e) => {
    this.props.nextSong();
  }

  controlButtons() {
    const buttons = {
      previous: this.toPreviousSong,
      pause: this.pauseSong,
      play: this.playSong,
      next: this.toNextSong
    };

    return Object.keys(buttons).map(btn => (
      <Box key={btn} px={3}>
        <ButtonCircle title={btn} size={48} onClick={buttons[btn]}>
          <Icon name={btn} size={28} />
        </ButtonCircle>
      </Box>
    ));
  }

  render() {
    if (!this.props.allSongs.length) {
      return <div></div>;
    }

    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1
      }
    };

    const { allSongs, currentSongIndex } = this.props;

    return (
      <Flex
        align="center"
        justify="space-between"
        wrap
        className="Song"
      >
        <YouTube
          videoId={allSongs[currentSongIndex].id.videoId}
          opts={opts}
          onReady={this._onReady}
        />
        {this.controlButtons()}
      </Flex>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ previousSong, nextSong }, dispatch);

const mapStateToProps = ({ search }) => ({
  allSongs: search.allSongs,
  currentSongIndex: search.currentSongIndex
});

export default connect(mapStateToProps, mapDispatchToProps)(Song);
