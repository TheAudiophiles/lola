import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Banner, Block, Heading } from 'rebass';
import { bindActionCreators } from 'redux';
import { Grid } from 'reflexbox';

import { setTokens, getMyInfo } from '../../actions';

import Search from '../../containers/search/Search';
import Song from '../../containers/song/Song';
import SongDetails from '../../containers/song-details/SongDetails';
import Load from '../../containers/load/Load';
import SearchResults from '../../containers/searchResults/SearchResults';
import Speech from '../../containers/speech/Speech';
import Queue from '../../containers/queue/Queue';

import Video from '../video/Video';

// export default () => (
//   <Banner backgroundImage="https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg">
//     <Grid p={2}>
//       <SongDetails />
//     </Grid>
//     <Queue />
//     <Block>
//       <Speech />
//       <Load />
//       <Search />
//     </Block>
//     <Song />
//     <SearchResults />
//   </Banner>
// );

export default () => (
  <div>
    <Grid col={4} px={2}>
      <Queue />
    </Grid>
    <Grid col={4} px={2}>
      <SongDetails />
      <Block>
        <Speech />
        <Load />
        <Search />
      </Block>
    </Grid>
    <Grid col={4} px={2}>
      <SearchResults />
    </Grid>
    <Song />
  </div>
);
