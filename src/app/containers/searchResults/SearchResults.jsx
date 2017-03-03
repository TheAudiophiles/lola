import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Carousel } from 'react-bootstrap';
import { selectSR } from '../../actions';

class SearchResults extends Component {
  constructor(props){
    super(props);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  selectSearchResult(result) {
    this.props.selectSR(result);
  }

  render() {
    const { searchResults } = this.props;

    if (!searchResults.length) {
      return <div className="no-results">No Search Results</div>;
    }

    return (
      <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect.bind(this)}
      >
        {searchResults.map((result, i) => (
          <Carousel.Item
            key={result.vid.items.length ? result.vid.items[0].id.videoId : i}
            onClick={() => { this.selectSearchResult.call(this, result) }}
          >
            <img
              alt="500x500"
              className="carousel-img"
              src={
                result.details
                  ? result.details.album.images[0].url
                  : 'https://cdn.browshot.com/static/images/not-found.png'
              }
            />
            <Carousel.Caption>
              <h3>{result.details ? result.details.name : result.track.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectSR }, dispatch);

const mapStateToProps = ({ songs }) => ({
  searchResults: songs.searchResults
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
