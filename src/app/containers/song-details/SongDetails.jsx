import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Block, Card, CardImage, Text, Heading, Media } from 'rebass';
// import { bindActionCrea//tors } from 'redux';
// import { addToPlaylist } from '../../actions'

class SongDetails extends Component {

  render () {
    if (
      !this.props.allSongs.length ||
      !this.props.allSongs[this.props.currentSongIndex].spotData
    ) {
      return <div></div>;
    }

    const { allSongs, currentSongIndex } = this.props;
    const songArt = allSongs[currentSongIndex].spotData.album.images[0].url;

    // not sure why scss is not being appied when I give Card className="song-details"
    const style = {
      maxWidth: '200px',
      margin: 'auto',
      background: '#000'
    };

    return (
      <Card style={style}>
        <CardImage src={allSongs[currentSongIndex].spotData.album.images[0].url} />
        <Heading
          level={2}
          size={3}
        >
          {allSongs[currentSongIndex].spotData.name}
        </Heading>
        <Text>
          Artist: {allSongs[currentSongIndex].spotData.artists[0].name}
          <br/>
          Album: {allSongs[currentSongIndex].spotData.album.name}
        </Text>
      </Card>

        // for putting the song details component outside of the search and playerController components
        // <Block classname='song-details'>
        //   <div className='album-cover' style={albumCoverStyle}>
        //     <Media
        //       img={songArt}
        //     />
        //   </div>
        //   <div className='sd-text'>
        //     <br/>
        //     Title: {allSongs[currentSongIndex].spotData.name}
        //     <br/>
        //     Artist: {allSongs[currentSongIndex].spotData.artists[0].name}
        //     <br/>
        //     Album: {allSongs[currentSongIndex].spotData.album.name}
        //     <br/>
        //   </div>
        // </Block>

        // <div className='album-cover' style={albumCoverStyle}>
        //   <Media
        //     img={songArt}
        //   />
        // </div>
        // <div className='song-details'>
        // <br/>
        // Title: {allSongs[currentSongIndex].spotData.name}
        // <br/>
        // Artist: {allSongs[currentSongIndex].spotData.artists[0].name}
        // <br/>
        // Album: {allSongs[currentSongIndex].spotData.album.name}
        // <br/>
        // </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addToPlayList }, dispatch);

const mapStateToProps = ({ search }) => ({
  allSongs: search.allSongs,
  currentSongIndex: search.currentSongIndex
});

export default connect(mapStateToProps)(SongDetails);
