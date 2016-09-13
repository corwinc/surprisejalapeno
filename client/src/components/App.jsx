import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import Geosuggest from 'react-geosuggest';
import BubbleChart from './BubbleChart.jsx';  

// EXAMPLE FOR TESTING // 
var dummyData = [
  {
    storyName: "example storyname 1",
    url: "https://www.google.com/",
    rating: 22,
    newsCategory: 1
  },
  {
    storyName: "example storyname 2",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 2
  },
  {
    storyName: "example storyname 3",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 4
  },
  {
    storyName: "example storyname 4",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 3
  },
  {
    storyName: "example storyname 5",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 6",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 7",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 2
  },
  {
    storyName: "example storyname 8",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 9",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 14",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 2
  },
  {
    storyName: "example storyname 24",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 34",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 44",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 54",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 64",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 74",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 84",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 94",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 64",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: "example storyname 74",
    url: "https://www.google.com/",
    rating: 14,
    newsCategory: 1
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    ////////start testing//////////
    //to assign a random category (will come from db later)
    var getCategory = function() {
      return Math.floor(Math.random() * 4);
    };
    
    //to assign a random rating (will come from db later)
    var getRating = function() {
      var ratings = [4, 6, 8, 10, 11, 8, 20];
      var rating = ratings[ Math.floor(Math.random() * ratings.length) ];
      return rating;
    };

    console.log(getRating());

    //iterate through story objects and assign random category and rating
    dummyData.forEach(function(storyObj) {
      var category1 = getCategory();
      var rating = getRating();
      storyObj.newsCategory = category1;
      storyObj.rating = rating;
    });
    ///////end testing///////////

    this.state = {
      location: '',
      data: [],    //remember to change back to empty array after done using dummy data
      numBubbles: 0
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
    const query = loc.split(' ').join('+');
    const encoded = encodeURIComponent(query);
    $.ajax({
      method: 'GET',
      url: '/query',
      dataType: 'json',
      data: {q: encoded},
      success: (data) => {
        data = JSON.parse(data);
        // data = dummyData; //FOR TESTING - NEED TO REMOVE THIS LINE
        
        //to assign a random category (will come from db later)
        var getCategory = function() {
          return Math.floor(Math.random() * 4);
        };
        
        //to assign a random rating (will come from db later)
        var getRating = function() {
          var ratings = [4, 6, 8, 10, 11, 8, 20];
          var rating = ratings[ Math.floor(Math.random() * ratings.length) ];
          return rating;
        };

        console.log(getRating());

        //iterate through story objects and assign random category and rating
        data.forEach(function(storyObj) {
          var category1 = getCategory();
          var rating = getRating();
          storyObj.newsCategory = category1;
          storyObj.rating = rating;
        });
        
        this.setState({data: data, numBubbles: data.length}); //changed from data.value
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
