const DatabaseFactory = require('../../db');

module.exports = (c) => {
  c.service('db', (c) => DatabaseFactory.init());
};
