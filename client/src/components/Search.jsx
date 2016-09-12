import React from 'react';
import Geosuggest from 'react-geosuggest';

const Search = (props) => (
  <div>
    <h2 class="bug1">Enter a location to see the top 20 news stories in your area!</h2>
    <h2 class="bug2">Find news in:</h2>
    <Geosuggest
      onSuggestSelect={props.handleSuggestionSelect}
      // placeholder="San Francisco"
      // location={new google.maps.LatLng(37.773972, -122.431297)}
      // radius="20"
    />
  </div>
);

export default Search;