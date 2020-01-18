'use strict';

//load Environment variables from the .env
require('dotenv').config();

//declalare Application Dependancies 
const express = require('express');
const cors = require('cors');

//Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

//route syntax = app.<operation>('<route>', callback );
app.get('/', (request, response) => {
    response.send('Home Page!');
})

app.get('/bad', (request, response) => {
    response.send('OOps, this is THE bad route');
})

app.get('/home', (request, response) => {
    response.send('Home Page numer 2!');
})

app.get('/about', aboutUsHandler);

function aboutUsHandler(request, response) {
    response.status(200).send('About us page');
}

//THIS is lab code.
app.get('/location', (request, response) => {
    try{
        const geoData = require('./data/geo.json');
        const city = request.query.city;
        console.log(request.query);
        const locationData = new Location(city, geoData);
        response.send(locationData);
    }
    catch(error){
        errorHandler('So sorry, something went wrong.', request, response);
    }
})




function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

function errorHandler(error, request, response) {
    response.status(500).send(error);
  }

//Ensure the server is listening for requests
//THIS MUST BE AT THE END OF THE FILE!!!
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));