'use strict';
const superagent = require('superagent');

const films = []

superagent.get('https://swapi.co/api/films')
  .then(data => {
    let obj = JSON.parse(data.text);
    // console.log(obj);
    obj.results.forEach(film => {
      films.push(film.title);
    });
    console.log(films);
  })