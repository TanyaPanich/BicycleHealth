1. Phaser for the image of bicycle
2. We will use a single EJS file (index.ejs) on the backend
3. Use jQuery to manipulate DOM in the EJS file
4. Use Axios for AJAX on the front end
5. Other than the EJS file, all the front end related code will be in 'public' directory.
6. Bootstrap in the EJS file.
7. There are other CSS files in '/public/styles' directory
8. Express server is used
9. All the routes will return data in JSON
10. Modularize everything including CSS
11. Use joi and express-validation
12. Use mocha, chai, supertest for TDD
13. Use boom for error messages and make sure to return JSON in the default error handlers in 'app.js'
14. Separate modules to access database tables using knex under directory called 'database'
15. In the routes, use the module in 14 to access database instead of calling knex directly, i.e. 'Separate Concerns'.
16. Use Alicia's eslintrc file, make sure source file is correctly indented and linted.  It makes reading and maintaining code easier.
