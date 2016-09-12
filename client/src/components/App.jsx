import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import Geosuggest from 'react-geosuggest';
import BubbleChart from './BubbleChart.jsx';  

// EXAMPLE FOR TESTING // 
var dummyData = [
  {
    storyName: "example storyname 1",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 2",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 3",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 4",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 5",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 6",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 7",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 8",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 9",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 1",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 2",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 3",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 4",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 5",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 6",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 7",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 8",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 9",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 6",
    url: "https://www.google.com/"
  },
  {
    storyName: "example storyname 7",
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

// Update state.location as user types in search bar
  handleSearchChange (e) {
    console.log('inside handleSearchChange');
    e.preventDefault();
    this.setState({location: e.target.value});
  }

// On search submit, set set.location and call function to send query to server
  handleSearchSubmit (e) {
    console.log('inside handleSearchSubmit');
    e.preventDefault();
    const location = this.state.location;
    if (!location) {
      return;
    }

    this.getNewsByLocation(location);
  }

// Handle user selection of Geosuggest suggestion from the dropdown
// Currently the function called when a user hits return, rather than handleSearchSubmit
  handleSuggestionSelect (e) {
    console.log('selection e:', e);
    const loc = e.label;
    this.setState({location: loc});
    this.getNewsByLocation(loc);
  }

// Send query w/ location from user input to server
  getNewsByLocation (loc) {
    console.log('inside getNewsByLocation');
    $.ajax({
      method: 'GET',
      url: '/query',
      dataType: 'json',
      data: {q: loc},
      success: (data) => {
        data = JSON.parse(data);
        data = dummyData; //FOR TESTING - NEED TO REMOVE THIS LINE
        
        //to assign a random category (will come from db later)
        var getCategory = function() {
          return Math.floor(Math.random() * 4);
        }
        
        //to assign a random rating (will come from db later)
        var getRating = function () {
          var ratings = [4, 6, 8, 10, 11, 8, 20];
          var rating = ratings[ Math.floor(Math.random() * ratings.length) ];
          return rating;
        }

        //iterate through story objects and assign random category
        data.forEach(function(storyObj) {
          var cat = getCategory();
          var rating = getRating();
          storyObj.newsCategory = cat;
          storyObj.rating = rating;
        });
        
        this.setState({data: data}); //changed from data.value
      },  

      error: (err) => {
        console.log('getNews err ', err);
      }
    })
  }

// On bubble click, open article in new tab
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
