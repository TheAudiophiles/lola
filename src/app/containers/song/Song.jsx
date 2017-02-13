import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

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

  playSong = (e) => {
    this.state.currentSong.playVideo();
  }

  pauseSong = (e) => {
    this.state.currentSong.pauseVideo();
  }

  render() {
    if (!this.props.search.length) {
      return <div></div>;
    }

    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div className="container">
        <YouTube
          videoId={this.props.search.slice(-1)[0].id.videoId}
          opts={opts}
          onReady={this._onReady}
        />
        <button onClick={this.playSong}>Play</button>
        <button onClick={this.pauseSong}>Pause</button>
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => ({ search });

export default connect(mapStateToProps)(Song);
