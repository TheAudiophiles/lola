import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Banner, Block, Heading } from 'rebass';
import { bindActionCreators } from 'redux';
import { Grid, Box } from 'reflexbox';

import { setTokens, getMyInfo } from '../../actions';

import Search from '../../containers/search/Search';
import Song from '../../containers/song/Song';
import Load from '../../containers/load/Load';
import SearchResults from '../../containers/searchResults/SearchResults';
import Speech from '../speech/Speech';
import QLToggle from '../../containers/qlToggle/QLToggle';
import Modal from '../command_info/CommandInfo';

export default () => (
  <div id="page-wrap">
    <div className='lola'>
      Lola
    </div>
    <Box style={{ display: 'flex' }} col={12} px={2}>
      <Search style={{ margin: 'auto' }} />
    </Box>
    <Grid col={4} px={2}>
      <QLToggle />
    </Grid>
    <Grid col={4} px={2}>
      <Block>
        <Box>
          <Load />
        </Box>
        <Speech />
        <Modal />
      </Block>
    </Grid>
    <Grid col={4} px={2}>
      <SearchResults />
    </Grid>
    <Song />
  </div>
);
