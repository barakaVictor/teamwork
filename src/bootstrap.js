const Container = require('./container.js');

/**  Connect all the parts together */
module.exports = (options) => {
  const container = new Container(options);
  require('./app/providers/appprovider')(container)
  require('./app/providers/databaseprovider')(container);
  require('./app/providers/authprovider')(container);
  require('./providers/indexprovider')(container);
  require('./providers/articlesprovider')(container);
  require('./providers/gifprovider')(container);
  require('./providers/feedsprovider')(container);
  return container;
};
