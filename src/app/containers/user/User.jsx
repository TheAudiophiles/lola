import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import spotifyApi from 'spotify-web-api-js';

import { setTokens, getMyInfo } from '../../actions';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authFailed: false
    };
  }

  componentDidMount() {
 	  const { accessToken, refreshToken } = this.props.params;
 	  const { setTokens, getMyInfo } = this.props;
  	setTokens({ accessToken, refreshToken });
    getMyInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.failed !== this.state.authFailed) {
      this.props.router.replace('/');
    }
    if (nextProps.auth.loggedIn !== this.state.loggedIn) {
      this.props.router.replace('/home');
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setTokens, getMyInfo }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
