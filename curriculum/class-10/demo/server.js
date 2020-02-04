'use strict';

// express, cors, pg, dotenv, superagent
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

// custom modules
const client = require('./db.js');
const locationHandler = require('./location.js');

const app = express();

app.use(cors());

/*
  res = {
    status: (number) => magic with the number,
    send: (words) => sends the words to the browser,
    json: (obj) => turns it into a string and sends to the browser
  }
*/

app.get('/location', locationHandler);

app.get('/weather', (req, res) => {

  // superagent to the api
  // constructor to sanitize it
  // send it out

  let weather = {};
  res.status(200).json(weather);
})

function startServer() {
  app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
}

startServer();