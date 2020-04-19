# teamwork

[![Build Status](https://travis-ci.org/barakaVictor/teamwork.svg?branch=develop)](https://travis-ci.org/barakaVictor/teamwork)
[![codecov](https://codecov.io/gh/barakaVictor/teamwork/branch/develop/graph/badge.svg)](https://codecov.io/gh/barakaVictor/teamwork)

An internal social network for employees of an organization.

### Installing

Once cloned the project the can be setup as follows:

Navigate into the project directory

```
cd teamwork
```
Install dependencies

```
npm install
```

### Start the application

Run the following command to fire up the application.
```
npm start
```
### Linting
The project uses eslint for code linting following the airbnb style guide. 
To execute code linting, do the following:

Only show linting issues

```
npm run lint
```
Fix errors that can be automatically fixed by the linter

```
npm run lint -- --fix
```

## Testing
The project uses mocha chai and chai-http to execute tests:

### Unit tests
```
npm run test:unit -s
```

### Integration tests
To execute this projects integration tests, first make sure to create the test database
and set the DATABASE_URL environment variable in your .env.test.cfg file. You can sepecify
your own file name ;). Afterwards, pass in the path to your test config file to the container factory
function i.e. createContainer({config_path: '/path/to/your/test/config.cfg'})
```
npm run test:int -s
```

