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
      <div className="modal-container" style={{height: 50}}>
        <Button
          bsStyle="default"
          bsSize="small"
          onClick={() => this.setState({ show: true})}
          style={{fontStyle: "italic"}}
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
          <Modal.Body style={{height: 250}}>
            <div className='col-md-5' style={{color:"black"}}>
              <div style={{fontSize:18, textDecoration:"underline"}} >What you want to do:</div>
              <div>Play a song from lyrics</div>
              <div>Play a song by an artist</div>
              <div>Add a song to your library</div>
              <div>Pause a song</div>
              <div>Play the last song</div>
              <div>Play the next song</div>
              <div>Turn the music up</div>
              <div>Turn the music down</div>
              <div>Mute the song</div>
              <div>Unmute the song</div>
            </div>
            <div className='col-md-5 col-md-offset-2' style={{color:"black"}}>
              <div style={{fontSize:18, textDecoration:"underline"}}>What you should say:</div>
              <div>Song contains 'Hello it\'s me'</div>
              <div>Play 'Hello' by Adele</div>
              <div>Add song to library</div>
              <div>Pause or pause song</div>
              <div>Previous song</div>
              <div>Next song</div>
              <div>Increase volume</div>
              <div>Decrease volume</div>
              <div>Mute</div>
              <div>Unmute</div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
