import React, { Component } from 'react';
import Slider from 'react-slick';

export default class SearchResults extends Component {
 render() {
    const settings = {
      className: 'center',
      centerMode: true,
      accessibility: true,
      arrows: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500
    };
    return (
      <div>
        <h3>Songs We Found</h3>
        <Slider {...settings}>
          <div><h3>First Slide</h3></div>
          <div><h3>Second Slide</h3></div>
          <div><h3>Third Slide</h3></div>
        </Slider>
      </div>
    );
  }
};
