'use strict';

// Everything in the .env file (VAR=value)
// Become: process.env.VAR
require('dotenv').config();

const server = require('./server.js');

server.start(process.env.PORT);