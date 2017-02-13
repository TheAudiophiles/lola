import React from 'react';

import Search from '../../containers/search/Search';
import Song from '../../containers/song/Song';

export default () => (
  <div className="container home">
    <h1>Home</h1>
    <Search />
    <Song />
  </div>
);
