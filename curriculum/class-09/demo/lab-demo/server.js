'use strict';

//load Environment variables from the .env
require('dotenv').config();

//declalare Application Dependencies 
const express = require('express');
const cors = require('cors');
//***************NOTE: pg is missing. We have moved all of the Postgres client code to a module

//Application Setup
const PORT = process.env.PORT;
const app = express();

app.use(cors());

//Our dependencies ******* modules
const location = require('./modules/Location.js');
const weather = require('./modules/Weather.js');



//route syntax = app.<operation>('<route>', callback );
//This is your list of routes
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
// app.get('/yelp', handler);
// app.get('/trails', handler);


//here are your callback functions
function locationHandler(request, response){
  let city = request.query.city;
  //Alternatively: let {city} = request.query;
  location.getLocationData(city) //this location is envoking the getLocationData() on the location module. it will return data
  .then( data => sendJson(data,response))  // we then envoke the sendJson(), passing it that data, this sends it to the client
  .catch((error) => errorHandler(error, request, response));
}

function weatherHandler(request, response){
  const { latitude, longitude } = request.query;
  weather(latitude, longitude) //here, the entire weather module is a function.  so we envoke the module as a function
  .then ( summaries => sendJson(summaries, response)) // sendJson() again passes the weather info back to the client
  .catch((error) => errorHandler(error, request, response));
}




//helper functions
function errorHandler(error, request, response) {
    console.error(error);
    response.status(500).send(error);
  }

function sendJson(data, response){
  response.status(200).send(data);
}

//Ensure the server is listening for requests
//THIS MUST BE AT THE END OF THE FILE!!!
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));