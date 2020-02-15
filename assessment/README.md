# 301 Assessment

Our company has completed the "Proof of Concept" phase of our "Most Popular Star Wars Characters" application. It's time to add some polish and new features to this application, and get it deployed.

As it currently stands, the application works as follows...

- The home page (`/`) will render a list of 10 characters from the Star Wars API
- As the user clicks on the "Upvote" button, the current number of votes or "Likes" for that character appears under their name

## Getting Started

1. Clone this repository to your machines
1. Create a postgres database called `code_301_assessment`
1. Copy `.env-sample` to `.env`, making any changes appropriate for your system
1. From within the folder you cloned into, run these commands
   1. `psql code_301_assessment -f ./sql/schema.sql`
   1. `npm install`
   1. `nodemon` or `npm start`

## Feature Requirements

Add the following functionality to the application

1. Make use of jQuery
1. Improve CSS organization
1. Improve presentation
1. Add a link or button that allows us to get and display more characters from the Star Wars API
1. Stretch goal: Like counts must be persisted to a database so that on a page refresh, we can see the total likes over time

### Requirements

1. Convert to jQuery

   1. Load jQuery from a CDN
   1. Replace as much of the existing vanilla JS with jQuery best practices

1. Convert the existing CSS to SMACSS organiztion

1. Add some creative styling to the application, adding styles to the appropriate SMACSS files
   1. Use flexbox or grid to lay out the character cards in a responsive grid.
   1. Incorporate a color theme
   1. Fix the footer to the bottom of the viewport
   1. Add at least one more meaningful improvement to the design

1. Add a button to the bottom of the page labeled "Get More Characters" that will dynamically load the next bunch of characters from the Star Wars API and render them on the page alongside the others:
   1. Add Handlebars to your page
      1. Load Handlebars from a CDN
      1. Create a Handlebars template for a single character `div`
   1. When the "Get More" button is clicked, perform an AJAX GET request to `/characters?page=X`, where `X` is the page of data currently requested
   1. Create a new `get` route called `/characters` on the server, that will return a single page of character information as JSON:
      1. When invoked, this route should use superagent on the server to retrieve the next page of results from SWAPI
      1. It should check the database for the total "likes" for each character in the list, adding the current total as a property to the object
      1. It should then respond with JSON, sending the object containing the characters' info, including the `likes` properties showing the total count

         ```javascript
         {
             "count": 87,
             "next": "https://swapi.co/api/people/?page=3",
             "previous": "https://swapi.co/api/people/?page=2",
             "results": [
                 {
                     "name": "Luke Skywalker",
                     "height": "172",
                     "likes": 17,
                     ...
                 },
                 {
                     "name": "C-3PO",
                     "height": "167",
                     "likes": 3,
                     ...
                 },
                 ...
             ]
         }
            ```

   1. Client-side ...
      1. Compile the Handlebars template for a character when the index page loads
      1. Parse the JSON in the response
      1. Use jQuery to loop over the results list of characters
      1. Render the html for a character using the Handlebars template
      1. Append the character's HTML to the DOM, after the others.

1. Rewire the buttons to save the upvote clicks permanently in the database:

   1. When the user clicks a button, send a PUT request to the server, at an endpoint of `/characters/<name of character>`
   1. Create a `put` route on the server to handle this, called `/characters/:name`
   1. When this server-side route is invoked, add one to the click count for the named character in the database
   1. Respond back to the client with a redirect to the index page
   1. Find a way to automatically load enough data to ensure the most recently changed charcter is showing on the screen
