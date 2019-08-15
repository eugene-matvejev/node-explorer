[ci.tests-master-badge]: https://circleci.com/gh/eugene-matvejev/node-explorer/tree/master.svg?style=svg
[ci.tests-master]: https://circleci.com/gh/eugene-matvejev/node-explorer/tree/master
[ci.coverage-master-badge]: https://codecov.io/gh/eugene-matvejev/node-explorer/branch/master/graph/badge.svg
[ci.coverage-master]: https://codecov.io/gh/eugene-matvejev/node-explorer/branch/master

[ci.tests-heroku-badge]: https://circleci.com/gh/eugene-matvejev/node-explorer/tree/heroku.svg?style=svg
[ci.tests-heroku]: https://circleci.com/gh/eugene-matvejev/node-explorer/tree/heroku
[ci.coverage-heroku-badge]: https://codecov.io/gh/eugene-matvejev/node-explorer/branch/heroku/graph/badge.svg
[ci.coverage-heroku]: https://codecov.io/gh/eugene-matvejev/node-explorer/branch/heroku

|               | master                                                        | heroku
|---            |---                                                            | ---
| __tests__     | [![tests][ci.tests-master-badge]][ci.tests-master]            | [![tests][ci.tests-heroku-badge]][ci.tests-heroku]
| __coverage__  | [![coverage][ci.coverage-master-badge]][ci.coverage-master]   | [![coverage][ci.coverage-heroku-badge]][ci.coverage-heroku]

##### THIS IS A SPARE TIME PROJECT, WORK IN PROGRESS! [DEMO](https://sa-explorer.herokuapp.com/)

# 'Explorer' GraphQL back-end

front-end can be found [here](https://github.com/eugene-matvejev/react-explorer)

### software requirements

if you're using `make` commands, __[docker](https://docs.docker.com/install/)__ and __[docker-compose](https://docs.docker.com/compose/install/)__ are required, and local __[node.js](https://nodejs.org/)__ with __[npm](https://www.npmjs.com/)__ are optional
* [node.js](https://nodejs.org/) v10+
* [npm](https://www.npmjs.com/) v6+ or [yarn](https://yarnpkg.com/)
* __optional__ [makefile](https://en.wikipedia.org/wiki/Makefile) comes out of the box in *unix* enviroments
* __optional__ [docker](https://www.docker.com/) v18.09+
* __optional__ [sqlite3](https://www.sqlite.org/index.html) v3+ *for 'integration' tests only*

### used technologies

* [apollo server](https://www.apollographql.com/docs/apollo-server/)
* [express.js](https://expressjs.com/)
* [sequlize](http://docs.sequelizejs.com/)
* [dataloader](https://github.com/graphql/dataloader)
* [graphql](https://graphql.org/)
* [jest](https://facebook.github.io/jest/)

### used services

* [circle ci](https://circleci.com/dashboard)
* [codecov](https://codecov.io/)
* [code climate](https://codeclimate.com/)
* [snyk](https://snyk.io/)
* [heroku](https://www.heroku.com/)

### how to install

* with `make` commands no steps additional required, otherwise you need execute `$ npm i`

### how to run tests

* `$ make test` or `$ npm test`
  * __optional__ [ 'jest' CLI params](https://facebook.github.io/jest/docs/en/cli.html) some examples:
    * to generate coverage report, example: `$ npm test -- --coverage`, which will be located in __./coverage__ directory
    * to execute tests __only__ in specific file, example: `$ npm test src/graphql/user.test.js`

### how to setup a database

* database configuration is located in the file __config/config.js__
* to get database schema up to date: `$ npm run sql db:migrate`, you can also create database via ORM `npm run sql db:create`
* to seed database with 'test' data: `$ npm run sql db:seed:all`

### how to run in 'development' mode

* `$ make` or `$ npm start`

### how to run in 'production' mode

* `$ make serve`, there is no *npm* equivalent
* if you __only__ need to generate static assets
  * `$ make build` or `$ npm run build` - generated assets will be located in __./build__ directory

### how to run containers with different variables using 'make'

* example: `make PORT=18081`

### gitflow

* *heroku* -> current __production__, contains *heroku specific changes*, trigger deploy on heroku on *every push*
* *master* -> most upto date __production ready__, all pull requests in to this branch got mandatory check 'ci/circleci: jest'
* *feature branches* -> get merged into master branch, when they ready and mandatory checks passed
* *CI execute tests in isolated enviroment*

### used environment variables

| variable      | default value | used as   | purpose
|---            |---            |---        | ---
| PORT          | 8081          | number    | port on which application will be made available
| DB_HOSTNAME   | 127.0.0.1     | string    | host on which database can be reached
| DB_USERNAME   | root          | string    | database user
| DB_PASSWORD   | password      | string    | database user's password
| DB_PORT       | 3306          | number    | port on which database can be reached
| DB_NAME       | explorer      | string    | database [schema] name
| DB_DIALECT    | mysql         | string    | database's dialect: one of mysql / sqlite / postgres

### supported databases

code, migrations, and fixtures are written in a way, that is supports 3 different database engines

| database      | version   | adapter                                           | main purpose
|---            |---        | ---                                               | ---
| MySQL         | 5.7       | [mysql2](https://www.npmjs.com/package/mysql2)    | local development
| PostgreSQL    | 11        | [pg](https://www.npmjs.com/package/pg)            | 'heroku' deployment
| SQLite        | 4         | [sqlite3](https://www.npmjs.com/package/sqlite3)  | QA Pipiles
