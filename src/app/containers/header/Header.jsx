import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Fixed, Toolbar, NavItem } from 'rebass';
import { scaleRotate as Menu } from 'react-burger-menu';
import Radium from 'radium';

let RadiumLink = Radium(Link);

import { spotifyLogout, resetLogout, clearState } from '../../actions';

import Speech from '../../containers/speech/Speech';
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

  // Will be moved to scss file
  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#bdc3c7'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  return (
    <Menu
      right
      styles={styles}
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
