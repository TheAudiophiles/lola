import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';

export default class SearchResults extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      direction: null
    };
  }

  getInitialState() {
    return {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    //alert('selected=' + selectedIndex + ', direction=' + e.direction);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
        <Carousel.Item>
          <img width={500} height={500} alt="500x500" src="https://static.pexels.com/photos/6548/cold-snow-winter-mountain.jpeg"/>
          <Carousel.Caption>
            <h3>Mountains</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={500} alt="500x500" src="https://c.tadst.com/gfx/750w/sunrise-sunset-sun-calculator.jpg?1"/>
          <Carousel.Caption>
            <h3>Sunset</h3>   
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={500} alt="500x500" src="https://www.nasa.gov/sites/default/files/cygx1_ill.jpg"/>
          <Carousel.Caption>
            <h3>Black Hole</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
};

// const mapStateToProps = ({ state }) => ({
//   index: state.index,
//   direction: state.direction
// });

//export default connect(mapStateToProps)(SearchResults);
// ReactDOM.render(<ControlledCarousel />, mountNode);
