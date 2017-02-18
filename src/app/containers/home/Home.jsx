import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Banner, Heading } from 'rebass';
import { bindActionCreators } from 'redux';
import { setTokens, getMyInfo } from '../../actions'

import Search from '../search/Search';
import Song from '../song/Song';
import SongDetails from '../song-details/SongDetails';

class Home extends Component {

 componentDidMount(){
 	const {accessToken, refreshToken} = this.props.params;
 	const { setTokens, getMyInfo } = this.props;
  	console.log('This is setTokens:', setTokens);
  	setTokens({accessToken, refreshToken});
 	getMyInfo();
 	console.log('This is props:', this.props);
  }
  render () {
  	return (
	  <Banner backgroundImage="https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg">
	    <Heading size={1} big children='lola' />
      <SongDetails />
	    <Search />
	    <Song />
	  </Banner>
  	)
  }
 }

function mapStateToProps (state){
	return state;
}

function mapDispatchToProps (dispatch){
	return bindActionCreators({ setTokens, getMyInfo }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
