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
            <div className='col-md-5' style={{color:"pink"}}>
              <div>What you want to do:</div>
              <div>Play a song from lyrics</div>
              <div>Play a song by an artist</div>
              <div>Pause a song</div>
              <div>Play the last song</div>
              <div>Play the next song</div>
              <div>Mute the song</div>
              <div>Unmute the song</div>
            </div>       
            <div className='col-md-5 col-md-offset-2' style={{color:"pink"}}>  
              <div>What you should say:</div> 
              <div>Song contains 'Hello it's me'</div>
              <div>Play 'Hello' by Adele</div> 
              <div>Pause or pause song</div>
              <div>Previous song</div>
              <div>Next song</div>
              <div>Mute</div>
              <div>Unmute</div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
