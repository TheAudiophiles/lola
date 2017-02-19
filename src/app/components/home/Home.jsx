import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Banner, Block, Heading } from 'rebass';
import { bindActionCreators } from 'redux';
import { setTokens, getMyInfo } from '../../actions';

import Search from '../../containers/search/Search';
import Song from '../../containers/song/Song';
import SongDetails from '../../containers/song-details/SongDetails';

export default () => (

  <Banner backgroundImage="https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg">
    <SongDetails />
    <Block>
      <Search />
      <Song />
    </Block>
  </Banner>
);
