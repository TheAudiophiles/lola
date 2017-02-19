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

  videoExists = (e) => Object.keys(this.state.currentSong).length;

  controlButtons() {
    const buttons = {
      previous: this.toPreviousSong,
      pause: this.pauseSong,
      play: this.playSong,
      next: this.toNextSong
    };

    return Object.keys(buttons).map(btn => {
      const nextDisabled = () =>
        this.props.allSongs.length - 1 === this.props.currentSongIndex && btn === 'next';

      const prevDisabled = () =>
        this.props.currentSongIndex === 0 && btn === 'previous';

      return (
        <Box key={btn} px={3}>
          <ButtonCircle
            disabled={
              !this.videoExists() || prevDisabled() || nextDisabled()
            }
            title={btn}
            size={48}
            onClick={this.videoExists ? buttons[btn] : ""}>
            <Icon name={btn} size={28} />
          </ButtonCircle>
        </Box>
      );
    });
  }

  flexWrap(children) {
    return (
      <Flex
        align="center"
        justify="space-between"
        wrap
        className="Song"
      >
        {children || ""}
        {this.controlButtons()}
      </Flex>
    );
  }

  youtubeComponent() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1
      }
    };

    const { allSongs, currentSongIndex } = this.props;

    return (
      <YouTube
        videoId={allSongs[currentSongIndex].ytData.items[0].id.videoId}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  render() {
    if (!this.props.allSongs.length) {
      return this.flexWrap();
    }

    return this.flexWrap(this.youtubeComponent());
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ previousSong, nextSong }, dispatch);

const mapStateToProps = ({ search }) => ({
  allSongs: search.allSongs,
  currentSongIndex: search.currentSongIndex
});

export default connect(mapStateToProps, mapDispatchToProps)(Song);
