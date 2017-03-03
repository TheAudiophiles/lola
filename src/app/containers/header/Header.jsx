import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Fixed, Toolbar, NavItem } from 'rebass';
import { scaleRotate as Menu } from 'react-burger-menu';
import Radium from 'radium';

let RadiumLink = Radium(Link);

import { spotifyLogout, resetLogout, clearState } from '../../actions';

import Search from '../../containers/search/Search';

const Header = (props) => {
  const { spotifyLogout, loggedOut, loggedIn, resetLogout, clearState } = props;

  const logoutHandler = (e) => {
    e.preventDefault();
    // clearState();
    window.localStorage.removeItem('redux');
    spotifyLogout();
  };

  if (loggedOut && !loggedIn) {
    resetLogout();
    window.location = '/logout';
  }

  return (
    <Menu
      right
      pageWrapId={ "page-wrap" }
      outerContainerId={ "outer-container" }>
      <RadiumLink id="home" className="menu-item" to="/home">Home</RadiumLink>
      <a id="logout" className="menu-item" onClick={logoutHandler} href="#">Logout</a>
    </Menu>
  );
};

const mapStateToProps = ({ auth }) =>
  ({ loggedOut: auth.loggedOut, loggedIn: auth.loggedIn });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ spotifyLogout, resetLogout, clearState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
