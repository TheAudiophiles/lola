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
    console.log('SEARCH RESULTS COMPONENT - searchResults:', searchResults);

    if (!searchResults.length) return <div>No Search Results</div>;

    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
        {searchResults.map(result => {
          return (
            <Carousel.Item onClick={() => { this.selectSearchResult.call(this, result) }}>
              <img
                width={250}
                height={250}
                alt="500x500"
                src={result.details ? result.details.album.images[0].url : 'https://cdn.browshot.com/static/images/not-found.png'}/>
              <Carousel.Caption>
                <h3>{result.details ? result.details.name : ''}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })
        }
      </Carousel>
    );
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectSR }, dispatch);

const mapStateToProps = ({ search }) => ({
  searchResults: search.searchResults,
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
