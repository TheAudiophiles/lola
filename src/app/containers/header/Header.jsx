import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Fixed, Toolbar, NavItem } from 'rebass';

import { spotifyLogout } from '../../actions';

const style = {marginLeft:'auto'};

const Header = (props) => {
  const { spotifyLogout, loggedOut } = props;

  const logoutHandler = (e) => {
    spotifyLogout();
  };

  if (loggedOut) {
    window.location = '/logout';
  }

  return (
    <Fixed top left right zIndex={1}>
      <Toolbar>
        <NavItem to="/" is={Link} children="Home" />
        <NavItem to="/about" is={Link} children="About" />
        <NavItem
          style={style}
          onClick={logoutHandler}
          is="a"
          children="Logout" />
      </Toolbar>
    </Fixed>
  );
};

const mapStateToProps = ({ auth }) => ({ loggedOut: auth.loggedOut });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ spotifyLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
