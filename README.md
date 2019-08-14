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

# 'Explorer' GraphQL SA

##### THIS IS A SPARE TIME PROJECT, WORK IN PROGRESS! [DEMO](https://sa-explorer.herokuapp.com/)

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

### how to setup a database

* database configuration is located in the file __config/config.js__
* to get database schema up to date: `$ npm run sql db:migrate`, you can also create database via ORM `npm run sql db:create`
* to seed database with 'test' data: `$ npm run sql db:seed:all`

### how to run tests

* `$ make test` or `$ npm test`
  * __optional__ [ 'jest' CLI params](https://facebook.github.io/jest/docs/en/cli.html) some examples:
    * to generate coverage report, example: `$ npm test -- --coverage`, which will be located in __./coverage__ directory
    * to execute tests __only__ in specific file, example: `$ npm test src/graphql/user.test.js`

### how to run in 'development' mode

* `$ make` or `$ npm start`

### how to run in 'production' mode

* `$ make serve`, there is no *npm* equivalent
* if you __only__ need to generate static assets
  * `$ make build` or `$ npm run build` - generated assets will be located in __./build__ directory

### gitflow

* *heroku* -> current __production__, contains *heroku specific changes*, trigger deploy on heroku on *every push*
* *master* -> most upto date __production ready__, all pull requests in to this branch got mandatory check 'ci/circleci: jest'
* *feature branches* -> get merged into master branch, when they ready and mandatory checks passed
* *CI execute tests in isolated enviroment*

### used environment variables

| variable      | default value | used as
|---            |---            |---
| PORT          | 8081          | number
| DB_HOSTNAME   | 127.0.0.1     | string
| DB_USERNAME   | root          | string
| DB_PASSWORD   | password      | string
| DB_PORT       | 3306          | number
| DB_NAME       | battleship    | string
| DB_DIALECT    | mysql         | string

### supported databases
| database      | version
|---            |---
| MySQL         | *5.7 tested*, using [mysql2](https://www.npmjs.com/package/mysql2)
| PostgreSQL    | *11 tested*, using [pg](https://www.npmjs.com/package/pg)
| SQLite        | *4.0.9 tested*, using [sqlite3](https://www.npmjs.com/package/sqlite3)
