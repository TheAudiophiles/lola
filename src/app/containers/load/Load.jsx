import React from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import SongDetails from '../song-details/SongDetails';

const Load = ({ loading, allSongs }) => {
  return (
    <div className="Load">
      {
        loading
          ? <Loading type="spin" />
          : !allSongs.length
            ? <h4>Search for a song by lyrics!</h4>
            : <SongDetails />
      }
    </div>
  );
};

const mapStateToProps = ({ songs }) => ({
  loading: songs.loading,
  allSongs: songs.allSongs
});

export default connect(mapStateToProps)(Load);
