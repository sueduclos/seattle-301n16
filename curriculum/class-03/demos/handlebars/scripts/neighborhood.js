'use strict';

let neighborhoods = [];

function Neighborhood (rawDataObject) {
    for (let key in rawDataObject) {
        this[key] = rawDataObject[key];
    }
}

// Neighborhood.prototype.toHtml = function() {
//   let container = $('.template').clone();
//   container.removeClass('template');
//   container.find('.name').text(this.name);
//   container.find('.city').text(`Part of: ${this.city}`);
//   container.find('.population').text(`Current population: ${this.population}`);
//   container.find('.founded').text(`Founded On: ${this.founded}`);
//   container.find('.body').html(this.body);
//   return container;
// }

Neighborhood.prototype.toHtml = function() {
    // 1. Get the template from the HTML document
    let template = $('#neighborhood-template').html();
    // 2. Use Handlebars to "compile" the HTML
    let templateRender = Handlebars.compile(template);
    // 3. Do not forget to return the HTML from this method
    return templateRender(this);
}

neighborhoodDataSet.forEach(neighborhoodObject => {
    neighborhoods.push(new Neighborhood(neighborhoodObject));
  });
  
  neighborhoods.forEach(ourNewNeighborhoodObject => {
    $('#neighborhoods').append(ourNewNeighborhoodObject.toHtml());
  });