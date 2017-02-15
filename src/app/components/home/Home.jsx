import React from 'react';
import { Banner, Heading } from 'rebass';

import Search from '../../containers/search/Search';
import Song from '../../containers/song/Song';

export default () => (
  <Banner
    backgroundImage="https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg"
  >
    <Heading size={1} big children='lola' />
    <Search />
    <Song />
  </Banner>
);
