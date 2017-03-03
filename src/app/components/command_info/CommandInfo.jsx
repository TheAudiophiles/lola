import React, { Component } from 'react';
import { Modal, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';


export default class CommandInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      show: false
    };
  }

  render() {

    let close = () => this.setState({ show: false});

    const tooltip = (
      <Tooltip id="tooltip"><strong>Command Info</strong></Tooltip>
    );

    return (
      <div className="modal-container">
        <OverlayTrigger placement="right" overlay={tooltip}>
          <Button
            bsStyle="default"
            bsSize="small"
            onClick={() => this.setState({ show: true})}
          >
            i
          </Button>
        </OverlayTrigger>
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
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>What to say</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Play a song from lyrics</td>
                  <td>Song contains "Hello it's me"</td>
                </tr>
                <tr>
                  <td>Play a song by an artist</td>
                  <td>Play "Hello" by Adele</td>
                </tr>
                <tr>
                  <td>Add a song to your library</td>
                  <td>Add song to library</td>
                </tr>
                <tr>
                  <td>Pause a song</td>
                  <td>Pause or pause song</td>
                </tr>
                <tr>
                  <td>Resume playing a song</td>
                  <td>Resume or resume song</td>
                </tr>
                <tr>
                  <td>Play the last song</td>
                  <td>Previous song</td>
                </tr>
                <tr>
                  <td>Play the next song</td>
                  <td>Next song</td>
                </tr>
                <tr>
                  <td>Turn the music up</td>
                  <td>Increase volume</td>
                </tr>
                <tr>
                  <td>Turn the music down</td>
                  <td>Decrease volume</td>
                </tr>
                <tr>
                  <td>Mute the song</td>
                  <td>Mute</td>
                </tr>
                <tr>
                  <td>Unmute the song</td>
                  <td>Unmute</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
