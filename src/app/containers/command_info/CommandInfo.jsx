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
            <div style={{color: "black"}}>Play Song by Lyrics</div>
            <div style={{color: "black"}}>Play Song by Artist</div>
            <div style={{color: "black"}}>Play Song by Track</div> 
            <div style={{color: "black"}}>Pause Song</div>
            <div style={{color: "black"}}>Previous Song</div>
            <div style={{color: "black"}}>Next Song </div>
            <div style={{color: "black"}}>Mute</div>
            <div style={{color: "black"}}>Unmute</div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
