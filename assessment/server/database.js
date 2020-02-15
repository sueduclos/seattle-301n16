'use strict';

// Bring in the postgres library
const pg = require('pg');

// Create a postgres client, using our environment variable setting
const client = new pg.Client(process.env.DATABASE_URL);

// Handle errors by logging them out
client.on('error', err => console.error(err));

// This module exports the client.
// The server will use this to do a connect()
// the routes will use this to run queries
module.exports = client;

// NOTE:
// When you have multiple modules that need access to the same thing
// One approach is to put it in a module like this, and have them both require it

