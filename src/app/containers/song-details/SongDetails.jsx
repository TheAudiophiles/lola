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

    let cover = 'http://previews.123rf.com/images/varka/varka1312/varka131200487/24584085-DJ-girl-Profile-of-pretty-girl-with-long-hair-in-headphones-Stock-Vector.jpg'; // turquoise lola ;)
    // let cover = 'http://st2.depositphotos.com/3004689/8038/v/950/depositphotos_80389828-stock-illustration-dj-girl-silhouette.jpg'; // purple lola
    if (allSongs[currentSongIndex].details.album.images[0].url) {
      cover = allSongs[currentSongIndex].details.album.images[0].url;
    }

    let title = 'undefined';
    if (allSongs[currentSongIndex].details.name) {
      title = allSongs[currentSongIndex].details.name;
    }

    let artist = 'undefined';
    if (allSongs[currentSongIndex].details.artists[0].name) {
      artist = allSongs[currentSongIndex].details.artists[0].name;
    }

    let album = 'undefined';
    if (allSongs[currentSongIndex].details.album.name) {
      album = allSongs[currentSongIndex].details.album.name;
    }
    // not sure why scss is not being appied when I give Card className="song-details"
    const style = {
      maxWidth: '200px',
      margin: 'auto',
      background: '#000'
    };

    return (
      <Card style={style}>
        <CardImage src={cover} />
        <Heading
          level={2}
          size={3}
        >
          {title}
        </Heading>
        <Text>
          Artist: {artist}
          <br/>
          Album: {album}
        </Text>
      </Card>
    );
  }

const mapDispatchToProps = dispatch => bindActionCreators({ addToPlayList }, dispatch);

const mapStateToProps = ({ search }) => ({
  allSongs: search.allSongs,
  currentSongIndex: search.currentSongIndex
});

export default connect(mapStateToProps)(SongDetails);
