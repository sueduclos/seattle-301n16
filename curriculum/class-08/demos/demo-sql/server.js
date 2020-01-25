'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error('pg problms', err));


app.get('/', (req, res) => {
    res.send('proof of life');
});

//our get route
app.get('/shapes', (req, response) => {
    let SQL = 'SELECT * FROM shapes;';
    client.query(SQL)
    .then(results => {
        response.send(results.rows);
    })
    .catch(err => console.error(err)); 
})



client.connect()
    .then( () => {
        app.listen(PORT, () => {
            console.log('server up on', PORT);
        });
    })
    .catch(err => {
        console.error('pg connect error', err);
    })

// client.connect();
// app.listen(PORT, () => console.log(`server up on ${PORT}`));