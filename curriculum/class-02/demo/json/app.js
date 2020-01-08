'use strict';

function Dog(dog) {
  this.name = dog.name;
  this.image_url = dog.image_url;
  this.hobbies = dog.hobbies;
}

Dog.allDogs = [];

Dog.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let dogClone = $('div[class="clone"]');

  let dogHtml = $('#dog-template').html();

  dogClone.html(dogHtml);

  dogClone.find('h2').text(this.name);
  dogClone.find('img').attr('src', this.image_url);
  dogClone.find('p').text(this.hobbies);
  dogClone.removeClass('clone');
  dogClone.attr('class', this.name);
};

Dog.readJson = () => {
  $.get('./data.json', 'json')
    .then(data => {
      data.forEach(item => {
        Dog.allDogs.push(new Dog(item));
      });
    })
    .then(Dog.loadDogs);
};

Dog.loadDogs = () => {
  Dog.allDogs.forEach(dog => dog.render());
};

$(() => Dog.readJson());
