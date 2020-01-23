'use strict';

//load Environment variables from the .env
require('dotenv').config();

//declalare Application Dependancies 
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

//route syntax = app.<operation>('<route>', callback );

//THIS is lab code.
//This is your list of routes
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
// app.get('/yelp', handler);
// app.get('/trails', handler);


//here are your callback functions
function locationHandler(request, response){
    try{
        let city = request.query.city;
        let key = process.env.GEOCODE_API_KEY;
        const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;

        superagent.get(url)
      .then(data => {
        const geoData = data.body[0]; // first one ...
        const location = new Location(city, geoData);
        response.send(location);
      })
      .catch(() => {
        errorHandler('location superagent broke', request, response);
      });
    }
    catch(error){
        errorHandler(error, request, response);
    }
}

function weatherHandler(request, response) {

  let latitude = request.query.latitude;
  let longitude = request.query.longitude;
  // Alternatively: let {latitude, longitude} = request.query;
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;

  superagent.get(url)
    .then(data => {
      const weatherSummaries = data.body.daily.data.map(day => {
        return new Weather(day);
      });
      response.status(200).json(weatherSummaries);
    })
    .catch(() => {
      errorHandler('So sorry, something went wrong.', request, response);
    });

}

//here are your constructors
function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData.display_name;
  this.latitude = geoData.lat;
  this.longitude = geoData.lon;
}

function Weather(day){
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toString().slice(0,15);
}

//helper functions
function errorHandler(error, request, response) {
    console.error(error);
    response.status(500).send(error);
  }

//Ensure the server is listening for requests
//THIS MUST BE AT THE END OF THE FILE!!!
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));