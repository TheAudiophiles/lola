import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rebass';
import { toggleQueue, toggleLibrary } from '../../actions';

class QLToggle extends Component {

  toggleQueueClickHandler = () => {
    this.props.toggleQueue();
  }

  toggleLibraryClickHandler = () => {
    this.props.toggleLibrary();
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleQueueClickHandler.bind(this)} disabled={this.props.queueOn}>Queue</Button>
        <Button onClick={this.toggleLibraryClickHandler.bind(this)} disabled={this.props.libraryOn}>Toggle</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ queueLibrary }) => ({
  queueOn: queueLibrary.queueOn,
  libraryOn: queueLibrary.libraryOn
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleQueue, toggleLibrary }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QLToggle);
