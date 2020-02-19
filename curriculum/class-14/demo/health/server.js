'use strict';

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const superagent = require('superagent');

const client = new pg.Client(process.env.DATABASE_URL);
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));  // http://localhost:300/anything ...
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', homePage);
app.get('/details/:id', getDay);

function homePage(req, res) {
  let SQL = "SELECT * FROM health_data";
  client.query(SQL)
    .then(results => {

      let goals = {
        steps: 10000,
        calories: 2000,
        sleep: 8
      };

      let healthRecords = HealthDataCollection(results.rows, goals);

      let state = {
        goals: goals,
        healthRecords: healthRecords
      }

      res.render('pages/index.ejs', state);
    });
}

function HealthDataCollection(records, goals) {

  // goals
  // { steps: 10000, calories: 2000, sleep: 8 }

  let data = [];

  records.forEach(record => {
    let steps_pct = record.steps / goals.steps;
    let calories_pct = record.calories / goals.calories;
    let sleep_pct = record.sleep_hours / goals.sleep;

    let goal_pct = Math.round(((steps_pct + calories_pct + sleep_pct) / 3) * 100);

    let newRecord = {
      id: record.id,
      day: record.day,
      pct: goal_pct
    }

    data.push(newRecord);

  });

  return data;

}

function getDay(req, res) {
  let id = req.params.id;
  let SQL = "SELECT * FROM health_data WHERE id = $1";
  let values = [id];
  client.query(SQL, values)
    .then(data => {
      res.json(data.rows[0]);
    })
    .catch(e => { throw e });

}

function startServer(port) {
  client.connect()
    .then(() => {
      app.listen(port, () => console.log('Up on', port));
    })
    .catch(e => { throw e });
}

// Something else can require us, and use .start()
module.exports = {
  start: startServer
};