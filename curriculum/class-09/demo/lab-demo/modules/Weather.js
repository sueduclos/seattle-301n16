'use strict';

const superagent = require('superagent');
module.exports = getWeather;

function getWeather(latitude, longitude) {
      const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;
    
      return superagent.get(url)
        .then(data1 => parseWeather(data1.body));              
    }

    function parseWeather(data2){
        try{
            const weatherSummaries = data2.daily.data.map(day => new Weather(day));
        //Jordan found a great way to summarize Promise.  Promise.resolve(value) Returns a new Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value.
        // Generally, if you don't know if a value is a promise or not, Promise.resolve(value) it instead and work with the return value as a promise.
            return Promise.resolve(weatherSummaries);
        }
        catch(error){
            return Promise.reject(error);
        }
    }
    
    function Weather(day){
        this.forecast = day.summary;
        this.time = new Date(day.time * 1000).toString().slice(0,15);
    }