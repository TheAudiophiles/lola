import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, NavItem, Button } from 'rebass';

import { clearQueue, navigateTo } from '../../actions';

class Queue extends Component {
  clearHandler = (e) => this.props.clearQueue();

  playHandler(index) {
    this.props.navigateTo(index);
  }

  render() {
    const { allSongs, currentSongIndex } = this.props.search;

    return (
      <Menu rounded>
        {allSongs.map((song, i) => {
          if (i !== currentSongIndex) {
            console.log('SONG TRACK ARTIST:', song.track.name, song.track.artist);
            return (
              <NavItem
                key={song.vid.items && song.vid.items.length ? song.vid.items[0].id.videoId : i}
                onClick={this.playHandler.bind(this, i)}
                is="a">
                {song.details
                  ? song.details.name
                  : `${song.track.name} - ${song.track.artist}`}
              </NavItem>
            );
          }
        })}
        <NavItem>
          <Button
            backgroundColor="primary"
            color="white"
            inverted
            rounded
            onClick={this.clearHandler}>
            Clear Queue
          </Button>
        </NavItem>
      </Menu>
    );
  }
}

const mapStateToProps = ({ search }) => ({ search });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearQueue, navigateTo }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
