import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Fixed, Toolbar, NavItem } from 'rebass';

import { spotifyLogout, resetLogout, clearState } from '../../actions';

const Header = (props) => {
  const { spotifyLogout, loggedOut, loggedIn, resetLogout, clearState } = props;

  const logoutHandler = (e) => {
    // clearState();
    window.localStorage.removeItem('redux');
    spotifyLogout();
  };

  if (loggedOut && !loggedIn) {
    resetLogout();
    window.location = '/logout';
  }

  const logoutStyle = { marginLeft: 'auto' };

  return (
    <Fixed top left right zIndex={1}>
      <Toolbar>

        <NavItem to="/home" is={Link} children="Lola" />
        <NavItem to="/about" is={Link} children="About" />
        <NavItem
          style={logoutStyle}
          onClick={logoutHandler}
          is="a"
          children="Logout"
        />
      </Toolbar>
    </Fixed>
  );
};

const mapStateToProps = ({ auth }) =>
  ({ loggedOut: auth.loggedOut, loggedIn: auth.loggedIn });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ spotifyLogout, resetLogout, clearState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
