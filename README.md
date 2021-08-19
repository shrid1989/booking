# Assignment

This pickup location search assignment built in React meets following criteria.
  - if user use search box and enter 2 or more alphanumeric characters into the “Pick-up Location” input
    then user can see a list of search results, maximum number of search results displayed is 6.
  - if user enter a search term in the “Pick-up Location” input that is not recognised e.g. “asdf1234”,
    then user should see the message “No results found”.
  - if user truncate the search term leaving only 1 character,
    then the search results list is no longer displayed.

# Hosted URL
https://car-booking-app-bc82f.web.app/


Node version: 10.

Install: `npm install`

Dev server: `npm start`

Production Build: `npm run build`

Jest tests: `npm test`

## Components

* Some components are still built locally to this repo if they are custom to the project.

# CSS Linter (SASS-LINT)
## property-sort-order:
  order:  
    - position  
    - top  
    - right  
    - bottom  
    - left 
    - display  
    - width
    - height  
    - margin  
    - padding  
    
Max-nesting: 3  
Variables required on CSS colors: color, background-color  
NO !importants  
NO #id except React DOM  


# JS Linter (ES-LINT)
JavaScript linter with React is installed (ES-LINT).  
Fix all linting errors and warnings locally before committing. The console will display how to fix the errors. Any issues ask Harry Jacks.

## JS Methods

Use ES6 syntax. Babel is being used to compile back.  
  
Use camel case for method names.     
  
# Unit Tests
Jest and Enzyme are being used for Unit tests. Each component needs a unit test adding and any utility function that returns a value.
