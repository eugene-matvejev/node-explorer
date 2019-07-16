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

# "RAG Status" GraphQL backend

##### THIS IS SPARE TIME PROJECT, WORK IN PROGRESS!

### software requirements

if you're using `make` commands, local **node.js** and **npm** aren't required
* [node.js](https://nodejs.org/) v10+
* [npm](https://www.npmjs.com/) v6+ or [yarn](https://yarnpkg.com/)
* __optional__ [makefile](https://en.wikipedia.org/wiki/Makefile) comes out of the box in *nix enviroments
* __optional__ [docker](https://www.docker.com/) v18.09+
* __optional__ [sqlite3](https://www.sqlite.org/index.html) v3+ *for 'integration' tests only*

### used technologies

* [jest](https://facebook.github.io/jest/)
* [graphql](https://graphql.org/)
* [sequlize](http://docs.sequelizejs.com/)
* [apollo server](https://www.apollographql.com/docs/apollo-server/)
* [express.js](https://expressjs.com/)

### used services

* [circle ci](https://circleci.com/dashboard)
* [codecov](https://codecov.io/)
* [code climate](https://codeclimate.com/)
* [snyk](https://snyk.io/)
* [heroku](https://www.heroku.com/)

### how to install

* if you're using `make` commands and have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed, then no steps required
* otherwise you need **node.js**, then execute `$ npm i`

### how to run tests

* 'jest' unit and functional tests `$ make test` or `$ npm test`
  * __[optional 'jest' CLI params](https://facebook.github.io/jest/docs/en/cli.html)__
    * to generate coverage report `--coverage`, example: `$ npm test -- --coverage`, report will be located in __./coverage__ directory
    * to run tests __only__ in specific file, example: `$ npm test src/graphql/user.test.js`

### how to run in 'development' mode

* `$ make` or `$ npm start`

### how to run in 'production' mode

* `$ make serve`, there is no _npm only_ analogue
* if you need __only__ generate static assets
  * `$ make build` or `$ npm run build` - generated assets will be located in __./build__ directory

### gitflow

* master -> most upto date __production__ version
* __proxy branch__ heroku -> master is not deployed to heroku with every push, because of limiations of 'free account'
* other branches -> 'feature branches' get merged into master
CI build is mandatory check for every PR into master/heroku branches

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
