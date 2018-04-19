1. Use Phaser for the image of bicycle
1. Use multiple EJS files on the backend
1. Use jQuery to manipulate DOM in EJS files
1. Use Axios for AJAX on the front end
1. Other than the EJS file, all the front end related code will be in 'public' directory.
1. Use Bootstrap in the EJS file.
1. There are other CSS files in '/public/styles' directory
1. Use Express server and Express generator
1. Use Content-Type to return either JSON or HTML in all the routes
1. Modularize everything including CSS
1. Use joi and express-validation (NOT YET IMPLEMENTED)
1. Use mocha, chai, supertest for TDD
1. Use boom for error messages and make sure to return JSON in the default error handlers in 'app.js'
1. Separate modules to access database tables using knex under directory called 'database'
1. In the routes, use the modules in 14 to access database instead of calling knex directly from routes in order to satisfy <b>'Separate Concerns'</b>.
1. Use Alicia's .eslintrc file, make sure source file is correctly indented and linted.  It makes reading and maintaining code easier.
1. Use the follwing coding convention
  <ul>
    <li>JavaScript variable and function names:&nbsp;&nbsp;camel</li>
    <li>JSON object:&nbsp;&nbsp;camel</li>
    <li>Database table and column names:&nbsp;&nbsp;snake</li>
  </ul>
