const AppFactory = require('..')

module.exports = (c) => {
  c.service('App', (c) => AppFactory.initApp());
};
