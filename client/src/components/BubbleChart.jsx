//bubble chart JSX

import React from 'react';
import ReactBubbleChart from 'react-bubble-chart';

const colorLegend = [         //COLOR SCALE EXAMPLE - WILL UPDATE
  // reds from dark to light
  {color: "#67000d", textColor: '#fee0d2', text: 'Negative'},
  {color: "#a50f15", textColor: '#fee0d2'},
  {color: "#cb181d", textColor: '#fee0d2'},
  "#ef3b2c",
  "#fb6a4a",
  "#fc9272",
  "#fcbba1",
  "#fee0d2",
  //neutral grey
  {color: "#f0f0f0", text: 'Neutral'},
  // blues from light to dark
  "#deebf7",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  {color: "#2171b5", textColor: '#deebf7'},
  {color: '#08519c', textColor: '#deebf7'},
  {color: "#08306b", textColor: '#deebf7', text: 'Positive'}
];

var idCounter = 0;
function getID() {
  idCounter++;
  var stringID = idCounter.toString();
  return stringID;  
}
                               
export default ({ data, handleClick }) =>
  <ReactBubbleChart
    colorLegend={colorLegend}          //this renders everything black if undefined
    legend={false}                     //if true, create and show a legend based on the passed colors
    selectedColor="#737373"            //for when bubble is 'selected'
    selectedTextColor="#d9d9d9"        //for when bubble is 'selected'
    fixedDomain={{min: -1, max: 1}}    //works with color legend - see react-bubble-chart docs
    
    onClick={handleClick}                         //NEED TO SET CLICK HANDLER HERE FOR OPENING NEWS URL:  onClick={}
    data={data.map(d => ({
      _id: getID(), //string, unique id (required) --> we didn't have this before React
      value: d.rating,             //number, to determine relative size of bubbles (required)
      colorValue: d.newsCategory,  //number, used to determine color
      selected: d.selected,        //boolean, uses selectedColor above for bubble if true
      url: d.url,                  //string, url for the article
      displayText: d.storyName
    }))}
  />

//Here are the data formats that react-bubble-chart is set up to receive:
/*

An array of data objects (defined below) used to populate the bubble chart.
{
   _id: string,        // unique id (required)
   value: number,      // used to determine relative size of bubbles (required)
   displayText: string,// will use _id if undefined
   colorValue: number, // used to determine color
   selected: boolean,  // if true will use selectedColor/selectedTextColor for circle/text
}

Can also be a nested JSON object if you want a nested bubble chart. That would look like:
{
  _id: string,
  children: [
    {data object},
    {data object},
    {
      _id: string,
      children: [...]
    }
  ]

*/