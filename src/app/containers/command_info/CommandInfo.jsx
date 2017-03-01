import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class CommandInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      show: false
    };
  }

  render() {

    let close = () => this.setState({ show: false});

    return (
      <div className="modal-container" style={{height: 200}}>
        <Button
          bsStyle="default"
          bsSize="small"
          onClick={() => this.setState({ show: true})}
        >
          i
        </Button>
        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title" style={{color: "black"}}>Lola's Commands</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
            <div style={{color: "black"}}>To play song by lyrics say: Song contains 'hello it's me'  </div>
            <div style={{color: "black"}}>To play song by an artist say: Play 'Hello' by Adele </div> 
            <div style={{color: "black"}}>To pause a song say: pause or pause song</div>
            <div style={{color: "black"}}>To play the previous song in your queue say: previous song</div>
            <div style={{color: "black"}}>To play the next song in your queue say: next song</div>
            <div style={{color: "black"}}>To mute the song say: mute</div>
            <div style={{color: "black"}}>To unmute the song say: unmute</div>
            <div style={{color: "black"}}>To increase the volume say: increase volume</div>
            <div style={{color: "black"}}>To decrease the volume say: unmute</div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
