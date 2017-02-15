import React from 'react';
import { Link } from 'react-router';
import { Fixed, Toolbar, NavItem } from 'rebass';

export default () => (
  <Fixed top left right zIndex={1}>
    <Toolbar>
      <NavItem to="/" is={Link} children="Home" />
      <NavItem to="/about" is={Link} children="About" />
    </Toolbar>
  </Fixed>
);

