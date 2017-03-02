import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, NavItem, Button } from 'rebass';

import { setSong } from '../../actions';

class Library extends Component {

  playHandler(song) {
    this.props.setSong(song);
  }

  render() {
    const { library } = this.props;

    console.log('LIBRARY COMPONENT - library:', library);

    const style = {
      background: '#373a47',
      color: '#bdc3c7'
    };

    return (
      <Menu style={style} rounded>
        {library.map((song, i) => {
            console.log('LIBRARY COMPONENT - song in library:', song);
            return (
              <NavItem
                key={song.videoId ? song.videoId : i}
                onClick={this.playHandler.bind(this, song)}
                is="a">
                {`${song.title} - ${song.artist}`}
              </NavItem>
            );
        })
        }
      </Menu>
    );
  }
}

const mapStateToProps = ({ library }) => ({
  library: library.library,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSong }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
