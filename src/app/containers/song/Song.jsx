import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AudioPlayer from '../audio_player/AudioPlayer';

import { previousSong, nextSong } from '../../actions';

class Song extends Component {
  toPreviousSong = (e) => {
    this.props.previousSong();
  }

  toNextSong = (e) => {
    this.props.nextSong();
  }

  render() {
    if (
      !this.props.allSongs.length ||
      !this.props.allSongs[this.props.currentSongIndex].vid
    ) {
      return <AudioPlayer />;
    }

    const { allSongs, currentSongIndex } = this.props;
    const { videoId } = allSongs[currentSongIndex].vid.items[0].id;

    return (
      <AudioPlayer
        onPrevTrack={this.toPreviousSong}
        onNextTrack={this.toNextSong}
        src={`https://www.youtube.com/embed/${videoId}`}
      />
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ previousSong, nextSong }, dispatch);

const mapStateToProps = ({ songs }) => ({
  allSongs: songs.allSongs,
  currentSongIndex: songs.currentSongIndex
});

export default connect(mapStateToProps, mapDispatchToProps)(Song);
