'use strict';


$('li').on('click', doThePopUpThing);

function doThePopUpThing() {
  // SERVER SAYS ... http://localhost:3000/details/3
  let id = $(this).attr('id');
  let url = `${rootUrl}/details/${id}`;
  $.ajax(url, {
    method: 'get',
    dataType: 'json'
  })
    .then(data => {
      renderDetails(data);
    })
}

function renderDetails(day) {
  // Get the HTML from the template
  let templateSourceCode = $("#details_template").html();
  // Use Handlebars to compile that HTML Template
  let render = Handlebars.compile(templateSourceCode);
  // Feed it the data (day)
  // Run it
  let detailsHTML = render(day);

  // Put the output into .content
  $('.content').html(detailsHTML);
}