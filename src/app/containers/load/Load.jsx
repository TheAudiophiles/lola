import React from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

const Load = ({ loading, allSongs }) => {
  return (
    <div className="Load">
      {
        loading
          ? <Loading type="spin" />
          : !allSongs.length
            ? <h4>Search for a song by lyrics!</h4>
            : <h4>Song playing...</h4>
      }
    </div>
  );
};

const mapStateToProps = ({ search }) => ({
  loading: search.loading,
  allSongs: search.allSongs
});

export default connect(mapStateToProps)(Load);
