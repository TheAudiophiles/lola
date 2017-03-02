import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rebass';
import { toggleQueue, toggleLibrary, fetchLibrary } from '../../actions';
import Queue from '../queue/Queue';
import Library from '../library/Library';

class QLToggle extends Component {

  toggleQueueClickHandler = () => {
    this.props.toggleQueue();
  }

  toggleLibraryClickHandler = () => {
    this.props.toggleLibrary();
    this.props.fetchLibrary();
  }

  render() {
    let component;
    this.props.queueOn ? component = <Queue/> : component = <Library/>;

    return (
      <div>
      <div className='buttons'>
        <Button onClick={this.toggleQueueClickHandler.bind(this)} disabled={this.props.queueOn} color='purple'>Queue</Button>
        <Button onClick={this.toggleLibraryClickHandler.bind(this)} disabled={this.props.libraryOn}>Library</Button>
      </div>
      <div className='toggle'>
        {component}
      </div>
    </div>
    );
  }
}

const mapStateToProps = ({ queueLibrary }) => ({
  queueOn: queueLibrary.queueOn,
  libraryOn: queueLibrary.libraryOn
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleQueue, toggleLibrary, fetchLibrary }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QLToggle);
