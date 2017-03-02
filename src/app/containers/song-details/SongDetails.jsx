import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Block, Card, CardImage, Text, Heading, Media, Button } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { addSongToLibrary } from '../../actions';
import axios from 'axios';

class SongDetails extends Component {
  constructor(props) {
    super(props);
  }

  addToLibraryClickHandler() {
    let { allSongs, currentSongIndex } = this.props;
    this.props.addSongToLibrary(allSongs[currentSongIndex]);
  }

  render () {
    let { allSongs, currentSongIndex } = this.props;

    if (!this.props.allSongs.length) {
      return <div></div>;
    }

    let cover, artist, album, title;

    if (allSongs[currentSongIndex].details) {
      cover = allSongs[currentSongIndex].details.album.images[0].url;
      artist = allSongs[currentSongIndex].details.artists[0].name;
      album = allSongs[currentSongIndex].details.album.name;
      title = allSongs[currentSongIndex].details.name;
    } else if (allSongs[currentSongIndex].track) {
      title = allSongs[currentSongIndex].track.name;
      artist = allSongs[currentSongIndex].track.artist;
    }

    const style2 = {
      width: '50px'
    }

    return (
      <Card>
        <CardImage className="image-responsive" src={cover ? cover : 'http://previews.123rf.com/images/varka/varka1312/varka131200487/24584085-DJ-girl-Profile-of-pretty-girl-with-long-hair-in-headphones-Stock-Vector.jpg'} />
        <Heading
          level={2}
          size={5}>
          {title ? title : 'title not found'}
        </Heading>
        <Text>
          Artist: {artist ? artist : 'artist not found'}
          <br/>
          Album: {album ? album : 'album not found'}
        </Text>
        <Button
          backgroundColor="primary"
          color="white"
          inverted
          rounded
          style={{width: '100%', textAlign: 'center'}}
          onClick={this.addToLibraryClickHandler.bind(this)}>
          Add to Library
        </Button>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addSongToLibrary }, dispatch);

const mapStateToProps = ({ songs }) => ({
  allSongs: songs.allSongs,
  currentSongIndex: songs.currentSongIndex
});

export default connect(mapStateToProps, mapDispatchToProps)(SongDetails);

// addtolibrary button pic - http://www.iconarchive.com/download/i7968/hopstarter/soft-scraps/Button-Add.ico
