'use strict';

const pg = require('pg');
const express = require('express');
const app = express();

const client = new pg.Client('postgres://localhost:5432/todo');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

// app.METHOD <= <form method="METHOD"
// app.method('/ROUTE')  <= <form action="/ROUTE"
// req.body.THING <= <input name="THING" when the form is POST
// req.query.THING <= <input name="THING" when the form is GET
app.get('/', (req, res) => {
  let SQL = "SELECT * FROM tasks";
  client.query(SQL)
    .then(results => {
      res.render('pages/index.ejs', { tasks: results.rows })
    })
});

app.get('/add', (req, res) => {
  res.render('pages/add.ejs')
});

app.post('/add', (req, res) => {
  /*
  req.body
  {
    task: 'Empty Dishwasher',
    assignedTo: 'John',
    status: 'incomplete'
  }
  */
  let SQL = `
    INSERT INTO tasks(task,assigned,status)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  let values = [req.body.task, req.body.assignedTo, req.body.status];

  client.query(SQL, values)
    .then(results => {
      // results.rowCount ...
      // results.rows ... []
      // results.rows[0] is our new task...
      res.render('pages/show.ejs', { task: results.rows[0] })
      // res.redirect('/');
    });

});


client.connect()
  .then(() => {
    app.listen(3000, () => console.log("up on 3000"));
  })
  .catch(() => console.log('bad things happened'));