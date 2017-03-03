import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, NavItem, Button } from 'rebass';

import { clearQueue, navigateTo, removeFromQueue } from '../../actions';

class Queue extends Component {
  clearHandler = (e) => this.props.clearQueue();

  playHandler(index) {
    this.props.navigateTo(index);
  }

  removeHandler(index) {
    this.props.removeFromQueue(index);
  }

  renderSongs() {
    const { allSongs, currentSongIndex } = this.props.songs;

    if (!allSongs.length) {
      return (
        <h3 className="queue-empty-msg">
          No songs in queue. Search or play song from library.
        </h3>
      );
    }

    return allSongs.map((song, i) => {
      if (i !== currentSongIndex) {
        return (
          <NavItem
            key={
              song.vid.items &&
              song.vid.items.length
                ? song.vid.items[0].id.videoId
                : i
            }
            is="div">
            <a className="queue-title" onClick={this.playHandler.bind(this, i)}>
              {song.details
                ? song.details.artists.length
                  ? `${song.details.name} - ${song.details.artists[0].name}`
                  : song.details.name
                : `${song.track.name} - ${song.track.artist}`}
            </a>
            <a onClick={this.removeHandler.bind(this, i)}>
              <img className="delete-btn" src={deleteBtnBase64()} />
            </a>
            <div className="flat-icon-credit">
              Icons made by
              <a
                href="http://www.flaticon.com/authors/madebyoliver"
                title="Madebyoliver">
                Madebyoliver
              </a> from
              <a href="http://www.flaticon.com" title="Flaticon">
                www.flaticon.com
              </a> is licensed by
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank">
                CC 3.0 BY
              </a>
            </div>
          </NavItem>
        );
      }
    })
  };

  render() {
    return (
      <Menu rounded>
        {this.renderSongs()}
        <NavItem style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        }}>
          <Button
            backgroundColor="#337ab7"
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

const mapStateToProps = ({ songs }) => ({ songs });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearQueue, navigateTo, removeFromQueue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Queue);

function deleteBtnBase64() {
  return "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUwIDUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MCA1MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxjaXJjbGUgc3R5bGU9ImZpbGw6I0Q3NUE0QTsiIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIvPgo8cG9seWxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHBvaW50cz0iMTYsMzQgMjUsMjUgMzQsMTYgICAiLz4KPHBvbHlsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiBwb2ludHM9IjE2LDE2IDI1LDI1IDM0LDM0ICAgIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
}
