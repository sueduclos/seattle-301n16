'use strict';

/*
  index.js

  Used by both nodemon and npm start to run a web server
  Depends on a server module that contains all of the routing logic
*/

// Read configurations from the .env file
require('dotenv').config();

// Import our server module
const server = require('./server/server.js');

// The server module must export a method called "start" so that we
// can start it up from this file
server.start();