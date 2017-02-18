import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Media } from 'rebass';
import { bindActionCreators } from 'redux';
// import { addToPlaylist } from '../../actions'

class SongDetails extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   currentSong: {}
  //   // };
  // }

  componentDidMount() {
    // console.log(allSongs[currentSongIndex].spotData.album.images[0].url);
    // const { setTokens, getMyInfo } = this.props;
    // console.log('This is setTokens:', setTokens);
    // setTokens({accessToken, refreshToken});
    // getMyInfo();
    // console.log('This is props:', this.props);
  }

  render () {
    if (!this.props.allSongs.length) {
      return <div></div>;
    }

    const { allSongs, currentSongIndex } = this.props;
    const songArt = allSongs[currentSongIndex].spotData.album.images[0].url;
    // const windowStyle = { height: '150px'; width: '150px'; background: '#636363'; opacity: '0.5'; border-radius: '3px';};
    // const windowStyle = { height: '150px' };

    // const imageStyle = { height: '50px', width: '50px', opacity='1'};
    // const imageStyle = { height: '50px'};


    return (
      // <Media
      //   align="center"
      //   img={songArt}
      //   style={imageStyle}
      // />
      <div className='sd-window'>
        <div>
          <img src={songArt}></img>
        </div>
        <div className='songDetails'>
          Title: {allSongs[currentSongIndex].spotData.name}
          <br/>
          Artist: {allSongs[currentSongIndex].spotData.artists[0].name}
          <br/>
          Album: {allSongs[currentSongIndex].spotData.album.name}
          <br/>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({ addToPlayList }, dispatch);

const mapStateToProps = ({ search }) => ({
  allSongs: search.allSongs,
  currentSongIndex: search.currentSongIndex
});

export default connect(mapStateToProps)(SongDetails);
