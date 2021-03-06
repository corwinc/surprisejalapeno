import React from 'react';
import ReactDOM from 'react-dom';
import NewsView from './NewsView.jsx';
import Search from './Search.jsx';
import ArticleEntry from './ArticleEntry.jsx';

// FOR TESTING // 
// var dummyData = [
//   {
//     title: "Naked Donald Trump statue appears in San Francisco",
//     url: 'http://www.cnn.com/videos/us/2016/08/19/naked-donald-trump-statue-in-san-francisco-dnt.kron',
//     relatedLocation: 'San Francisco',
//     hotnessRating: 18,
//     topic: 'Presidential Election'
//   },
//   {
//     title: "Santa Clara Police Union Threatens Boycott of 49ers Games Over",
//     url: 'http://www.nbcbayarea.com/news/local/Santa-Clara-Police-Officers-Association-May-Boycott-Working-49ers-Games-392214541.html',
//     relatedLocation: 'San Francisco',
//     hotnessRating: 17,
//     topic: 'Sports'
//   },
//   {
//     title: "15 SEA SCOUTS RESCUED AFTER BOATS FLIPS IN SAN FRANCISCO BAY",
//     url: 'http://abc7news.com/news/15-sea-scouts-rescued-after-boats-flips-in-san-francisco-bay-/1498260/',
//     relatedLocation: 'San Francisco',
//     hotnessRating: 8,
//     topic: 'Boating'
//   }
// ];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      data: []
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.getNewsByLocation = this.getNewsByLocation.bind(this);
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

    // Clearing out input field not working -- maybe a feature?
    // this.setState({location: ''});
    this.getNewsByLocation(location);

  }

  getNewsByLocation (loc) {
    console.log('inside getNewsByLocation');
    $.ajax({
      method: 'GET',
      url: '/query',
      dataType: 'json',
      data: {q: loc},
      success: (data) => {
        this.setState({data: data}).bind(this);
        // plug data into D3:
        // either inside react app or send to new page w/ D3
      },
      error: (err) => {
        console.log('getNews err ', err);
      }
    })
  }

  render() {
    return (
      <div>
        <div>
          <Search props={this.props} handleSearchChange={this.handleSearchChange} handleSearchSubmit={this.handleSearchSubmit} />
        </div>
        <div>
          <NewsView props={this.props} data={this.state.data} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));