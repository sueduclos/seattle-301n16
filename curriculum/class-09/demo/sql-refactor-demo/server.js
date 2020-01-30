'use strict';

//load Environment variables from the .env
require('dotenv').config();

//declalare Application Dependancies 
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));


//Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

//This is your list of routes
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
// app.get('/yelp', handler);
// app.get('/trails', handler);


//here are your callback functions
//***********LOCATION LOGIC ***************************
function locationHandler(request, response){
  let city = request.query.city;
  getLocationData(city)
  .then( data => {
    response.status(200).send(data);
  })  
  .catch((error) => errorHandler(error, request, response));
}

function getLocationData(city){
  //CACHE
  //if the location is in cache, return location
  //funtionally, let's pull all of this out of locationHandler and make it a function.
  let SQL = 'SELECT * FROM locations WHERE search_query = $1;';
  let values = [city];
  
  return client.query(SQL, values)
  .then(results => {
    if(results.rowCount) {return results.rows[0];}
    else{
      // try{
      //   let key = process.env.GEOCODE_API_KEY;
      //   const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;
        
      //   superagent.get(url)
      //   .then(data => {
      //     const geoData = data.body[0]; // first one ...
      //     const location = new Location(city, geoData);
             //somehow we have to also now send an INSERT QUERY to our db and chache this city
      //     response.send(location);
      //   })
      //   .catch(() => {
      //     errorHandler('location superagent broke', request, response);
      //   });
      // }
      // catch(error){
      //   errorHandler(error, request, response);
      // }
      //**************THIS ELSE IS DOING TOO MUCH!!!************
      //Let's move the CACHE feature out, and send the api data to a cache function
      let key = process.env.GEOCODE_API_KEY;
        const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;
        return superagent.get(url)
          .then(data => cacheLocation(city, data.body));
    }
  })
}

function cacheLocation(city, data){
  const location = new Location(data[0]);
    let SQL = `INSERT INTO locations (search_query, formatted_query, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;
    let values = [city, location.formatted_query, location.latitude, location.longitude];
    return client.query(SQL, values)
      .then(results => results.rows[0])
}


// ********************* WEATHER LOGIC ***************************

function weatherHandler(request, response) {
  //CACHE 
//Why might we not cache this info??
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
client.connect();
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));