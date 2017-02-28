import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Banner, Block, Heading } from 'rebass';
import { bindActionCreators } from 'redux';
import { Grid, Box } from 'reflexbox';

import { setTokens, getMyInfo } from '../../actions';

import Search from '../../containers/search/Search';
import Song from '../../containers/song/Song';
import SongDetails from '../../containers/song-details/SongDetails';
import Load from '../../containers/load/Load';
import SearchResults from '../../containers/searchResults/SearchResults';
import Speech from '../../containers/speech/Speech';
import Queue from '../../containers/queue/Queue';

export default () => (
  <div id="page-wrap">
    <Grid style={{ display: 'flex' }} col={12} px={2}>
      <Search style={{ margin: 'auto' }} />
    </Grid>
    <Grid col={4} px={2}>
      <Queue />
    </Grid>
    <Grid col={4} px={2}>
      <SongDetails />
      <Block>
        <Box>
          <Load />
        </Box>
        <Speech />
      </Block>
    </Grid>
    <Grid col={4} px={2}>
      <SearchResults />
    </Grid>
    <Song />
  </div>
);
