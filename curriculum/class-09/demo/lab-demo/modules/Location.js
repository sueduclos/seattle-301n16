'use strict';
//BEHOLD!! All the code for getting/finding location has been moved to a module!

const superagent = require('superagent'); //we need to move superagent to each module that will make api calls
const client = require('./Client'); //This is bringing in an instance of our Client module

const location = {}; //notice at the bottom.  this is what we are exporting.  By envoking getLocaitonData()
//from the server, this location object will get info from either DB cache or from the insert(after api call)
//and the module exports this object.

location.getLocationData = function (city){
    let SQL = `SELECT * FROM locations WHERE search_query = $1;`;
    let values = [city];
  
    return client.query(SQL, values)
      .then(results => {
        if(results.rowCount) { return results.rows[0]; }
        else{
          let key = process.env.GEOCODE_API_KEY;
          const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;
  
          return superagent.get(url)
          .then( data => cacheLocation(city, data.body)) //we have moved the cache to db into its own function
        }
      })
  }
  
  function cacheLocation(city, data) {
    const location = new Location(data[0]);
    let SQL = `INSERT INTO locations (search_query, formatted_query, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;
    let values = [city, location.formatted_query, location.latitude, location.longitude];
    return client.query(SQL, values)
      .then(results => results.rows[0])
  }

  function Location(data){
    this.formatted_query = data.display_name;
    this.latitude = data.lat;
    this.longitude = data.lon;
  }

module.exports = location;

// First: Query the DB based on the city name.
// IF: city exists in db it returns the cached location info to the location object
  //and the module exports location object to server.js.
// ELSE: superagent makes a call to LocationIQ and gets new city info.  We pass that info to
  // chacheLocation()  
  //NEXT: cacheLocation() makes a new Location object and makes an INSERT QUERY, caching that city info
  //in the db.  Upon a successful INSERT postgres sends back the object, which goes to the location
  //object, which the module exports to server.js.