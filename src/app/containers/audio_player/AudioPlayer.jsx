import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Media, Player, controls, utils } from 'react-media-player';
import PlayPause from '../../components/play_pause/PlayPause';
import MuteUnmute from '../../components/mute_unmute/MuteUnmute';
import { resetVolumeChange } from '../../actions';
import './audio_player.scss';

const { CurrentTime, Progress, SeekBar, Duration, Volume, Fullscreen } = controls;
const { formatTime } = utils;

const PrevTrack = (props) => (
  <svg width="10px" height="12px" viewBox="0 0 10 12" {...props}>
    <polygon fill="#FAFBFB" points="10,0 2,4.8 2,0 0,0 0,12 2,12 2,7.2 10,12"/>
  </svg>
);

const NextTrack = (props) => (
  <svg width="10px" height="12px" viewBox="0 0 10 12" {...props}>
    <polygon fill="#FAFBFB" points="8,0 8,4.8 0,0 0,12 8,7.2 8,12 10,12 10,0"/>
  </svg>
);

class AudioPlayer extends Component {
  componentWillReceiveProps(nextProps) {
    const { volumeChange, muted, isPlaying } = nextProps;

    if (volumeChange.status === true) {
      let currentVolume = this._player.context.media.volume;
      volumeChange.direction === 'up' ? this.changeVolume(currentVolume + 0.15) : this.changeVolume(currentVolume - 0.15);
    }

    if (muted !== this._player.context.media.isMuted) this.mute(muted);

    if (!isPlaying) {
      this.pauseSong();
    }
    if (isPlaying) {
      this.resumeSong();
    }
  }

  _handlePrevTrack = () => {
    if (this._player.context.media.duration > 0.1) {
      this.props.onPrevTrack();
    }
  }

  _handleNextTrack = () => {
    if (this._player.context.media.duration > 0.1) {
      this.props.onNextTrack();
    }
  }

  pauseSong = () => {
    if (this._player) {
      this._player.context.media.pause();
    }
  }

  changeVolume(volume) {
    if (this._player) {
      if (volume > 1) this._player.context.media.setVolume(1);
      else if (volume < 0) this._player.context.media.setVolume(0);
      else this._player.context.media.setVolume(volume);
      this.props.resetVolumeChange();
    }
  }

  resumeSong = () => {
    if (this._player) {
      this._player.context.media.play();
    }
  }

  mute(muted) {
    if (this._player) {
      this._player.context.media.mute(muted);
    }
  }

  render() {
    return (
      <Media>
        <div className="wide">
          <Player
            ref={c => this._player = c}
            src={this.props.src}
            autoPlay
          />
          <div className="media-controls">
            <PrevTrack className="media-control media-control--prev-track" onClick={this._handlePrevTrack}/>
            <PlayPause className="media-control media-control--play-pause"/>
            <NextTrack className="media-control media-control--next-track" onClick={this._handleNextTrack}/>
            <CurrentTime className="media-control media-control--current-time"/>
            <SeekBar className="media-control media-control--volume-range"/>
            <Duration className="media-control media-control--duration"/>
            <MuteUnmute className="media-control media-control--mute-unmute"/>
            <Volume className="media-control media-control--volume"/>
          </div>
        </div>
      </Media>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ resetVolumeChange }, dispatch);

const mapStateToProps = ({ audioPlayer }) => ({
    volumeChange: audioPlayer.volumeChange,
    muted: audioPlayer.muted,
    isPlaying: audioPlayer.isPlaying
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
