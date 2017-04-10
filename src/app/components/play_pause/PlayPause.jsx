import React, { Component, PropTypes } from 'react';
import { withMediaProps } from 'react-media-player';
import Transition from 'react-motion-ui-pack';

class ScaleX extends Component {
  render() {
    return (
      <Transition
        component="g"
        enter={{ scaleX: 1 }}
        leave={{ scaleX: 0 }}
      >
        {this.props.children}
      </Transition>
    );
  }
}

class PlayPause extends Component {
  _handlePlayPause = () => {
    if (this.props.media) {
      const { isPlaying, play, pause } = this.props.media;
      // At the moment there is an issue with react-media-player
      // not setting this.props.media.isPlaying to true on
      // autoplay so isPlaying is always the opposite of what
      // it should be. So if it's false then we play and change
      // isPlaying redux state to true, if true then we pause
      // and change isPlaying redux state to false
      if (!isPlaying) {
        play();
        // change audioPlayer.isPlaying in redux store to true
        this.props.resumeSongState();
      } else {
        pause();
        // change audioPlayer.isPlaying in redux store to false
        this.props.pauseSongState();
      }
    }
  }

  // not sure what these lone const declarations
  // are doing here, commenting out for now
  // componentWillReceiveProps() {
  //   const { media: { isPlaying }, className } = this.props;
  // }

  render() {
    const { media: { isPlaying }, className } = this.props;
    return (
      <svg
        role="button"
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        className={className}
        onClick={this._handlePlayPause}
      >
      	<circle fill="#373D3F" cx="18" cy="18" r="18"/>
          <ScaleX>
            { isPlaying &&
              <g key="pause" style={{ transformOrigin: '0% 50%' }}>
        	      <rect x="12" y="11" fill="#CDD7DB" width="4" height="14"/>
        	      <rect x="20" y="11" fill="#CDD7DB" width="4" height="14"/>
              </g>
            }
          </ScaleX>
          <ScaleX>
            { !isPlaying &&
              <polygon
                key="play"
                fill="#CDD7DB"
                points="14,11 26,18 14,25"
                style={{ transformOrigin: '100% 50%' }}
              />
            }
          </ScaleX>
      </svg>
    );
  }
}

export default withMediaProps(PlayPause);
