import React, { Component } from 'react';
import { connect } from 'react-redux';

class CheckAuth extends Component {
  componentDidMount() {
    const { loggedIn, accessToken, refreshToken } = this.props.auth;

    if (!loggedIn || !accessToken || !refreshToken ) {
      this.props.router.replace('/');
    }
  }

  render() {
    const { loggedIn, accessToken, refreshToken } = this.props.auth;

    if (loggedIn && accessToken && refreshToken) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ auth }, ownProps) => ({
  auth,
  currentURL: ownProps.location.pathname
});

export default connect(mapStateToProps)(CheckAuth);
