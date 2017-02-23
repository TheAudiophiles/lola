import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Block, Card, CardImage, Text, Heading, Media } from 'rebass';

class SongDetails extends Component {

  render () {
    if (
      !this.props.allSongs.length ||
      !this.props.allSongs[this.props.currentSongIndex].details
    ) {
      return <div></div>;
    }

    const { allSongs, currentSongIndex } = this.props;

    const cover = allSongs[currentSongIndex].details.album.images[0].url;

    const title = allSongs[currentSongIndex].details.name;

    const artist = allSongs[currentSongIndex].details.artists[0].name;

    const album = allSongs[currentSongIndex].details.album.name;
    
    // not sure why scss is not being appied when I give Card className="song-details"
    const style = {
      maxWidth: '200px',
      margin: 'auto',
      background: '#000'
    };

    return (
      <Card style={style}>
        <CardImage src={cover ? cover : 'http://previews.123rf.com/images/varka/varka1312/varka131200487/24584085-DJ-girl-Profile-of-pretty-girl-with-long-hair-in-headphones-Stock-Vector.jpg'} />
        <Heading
          level={2}
          size={3}
        >
          {title ? title : 'undefined'}
        </Heading>
        <Text>
          Artist: {artist ? artist : 'undefined'}
          <br/>
          Album: {album ? album : 'undefined'}
        </Text>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addToPlayList }, dispatch);

const mapStateToProps = ({ search }) => ({
  allSongs: search.allSongs,
  currentSongIndex: search.currentSongIndex
});

export default connect(mapStateToProps)(SongDetails);
