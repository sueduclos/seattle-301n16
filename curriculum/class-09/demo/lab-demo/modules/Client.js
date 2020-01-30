'use strict';
//BEHOLD!! We have moved all of our pg client code to a module!
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

module.exports = client;