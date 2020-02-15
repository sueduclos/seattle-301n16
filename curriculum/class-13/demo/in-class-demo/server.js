'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');

const app = express();
const client = new pg.Client(process.env.DATABASE_URL);

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extened: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  let SQL = "SELECT * FROM tasks";
  client.query(SQL)
    .then(results => {
      res.render('pages/index.ejs', { tasks: results.rows })
    })
});

app.get('/task/:id', (req, res) => {
  let id = req.params.id;
  let SQL = "SELECT * FROM tasks WHERE id = $1";
  let values = [id];
  client.query(SQL, values)
    .then(results => {
      res.render('pages/detail', { task: results.rows[0] })
    })
});

app.post('/tasks', (req, res) => {
  res.send('Creaded Task');
});

app.put('/task/:id', (req, res) => {
  let id = req.params.id;
  let task = req.body.task;
  let assigned = req.body.assigned;
  let status = req.body.status;

  let SQL = "UPDATE tasks SET task=$1, assigned=$2, status=$3 WHERE id = $4";
  let values = [task, assigned, status, id];

  client.query(SQL, values)
    .then(() => {
      res.redirect(`/task/${id}`);
    })
    .catch(e => { throw e; })

});

app.delete('/task/:id', (req, res) => {
  let id = req.params.id;
  let SQL = "DELETE FROM tasks WHERE id = $1";
  let values = [id];
  client.query(SQL, values)
    .then(() => {
      res.redirect('/');
    })
    .catch(e => { throw e })
});

client.connect()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(process.env.PORT))
  });