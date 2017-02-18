import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Block, Media } from 'rebass';
import { bindActionCreators } from 'redux';
// import { addToPlaylist } from '../../actions'

class SongDetails extends Component {

  render () {
    if (!this.props.allSongs.length) {
      return <div></div>;
    }

    const { allSongs, currentSongIndex } = this.props;
    const songArt = allSongs[currentSongIndex].spotData.album.images[0].url;

    return (
      // <Block>
      //   <Media
      //     img={songArt}
      //   />
      //   <br/>
      //   Title: {allSongs[currentSongIndex].spotData.name}
      //   <br/>
      //   Artist: {allSongs[currentSongIndex].spotData.artists[0].name}
      //   <br/>
      //   Album: {allSongs[currentSongIndex].spotData.album.name}
      //   <br/>
      // </Block>
      <div className='sd-window'>
        <Media
          img={songArt}
        />
        <br/>
        Title: {allSongs[currentSongIndex].spotData.name}
        <br/>
        Artist: {allSongs[currentSongIndex].spotData.artists[0].name}
        <br/>
        Album: {allSongs[currentSongIndex].spotData.album.name}
        <br/>
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
