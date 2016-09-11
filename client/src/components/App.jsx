import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import Geosuggest from 'react-geosuggest';
import BubbleChart from './BubbleChart.jsx';  

// EXAMPLE FOR TESTING // 
var dummyData = [
  {
    storyName: "example storyname 1",
    newsCategory: -0.5,
    rating: 15,
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 2",
    newsCategory: 0.7,
    rating: 9,
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 3",
    newsCategory: -1,
    rating: 30,
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 4",
    newsCategory: -0.5,
    rating: 15,
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 5",
    newsCategory: 0.7,
    rating: 9,
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 6",
    newsCategory: 1,
    rating: 30,
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 7",
    newsCategory: -0.5,
    rating: 22,
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 8",
    newsCategory: 0.7,
    rating: 13,
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 9",
    newsCategory: 1,
    rating: 30,
    url: "https://www.google.com/"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      data: dummyData,    //remember to change back to empty array after done using dummy data
      numBubbles: dummyData.length
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSuggestionSelect = this.handleSuggestionSelect.bind(this);
    this.getNewsByLocation = this.getNewsByLocation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSearchChange (e) {
    console.log('inside handleSearchChange');
    e.preventDefault();
    this.setState({location: e.target.value});
  }

  handleSearchSubmit (e) {
    console.log('inside handleSearchSubmit');
    e.preventDefault();
    const location = this.state.location;
    if (!location) {
      return;
    }

    this.getNewsByLocation(location);
  }

  handleSuggestionSelect (e) {
    console.log('selection e:', e);
    const loc = e.label;
    this.setState({location: loc});
    this.getNewsByLocation(loc);
  }

  getNewsByLocation (loc) {
    console.log('inside getNewsByLocation');
    $.ajax({
      method: 'GET',
      url: '/query',
      dataType: 'json',
      data: {q: loc},
      success: (data) => {
        data = JSON.parse(data);
        this.setState({data: data.value});
      },  
      error: (err) => {
        console.log('getNews err ', err);
      }   
    })
  }

  handleClick (d) {
    console.log('inside handleClick, d:', d);
    window.open(d.url);
  }

  render() {
    return (
      <div>
        <section>
          <Search props={this.props} handleSearchChange={this.handleSearchChange} handleSearchSubmit={this.handleSearchSubmit} handleSuggestionSelect={this.handleSuggestionSelect} />
        </section>
        <section>
          <BubbleChart data={this.state.data} handleClick={this.handleClick} />
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));