const Container = require('./container.js');

module.exports = function () {
  const container = new Container();
  require('./app/providers/appprovider')(container)
  require('./app/providers/databaseprovider')(container);
  require('./providers/indexprovider')(container);
  require('./providers/authprovider')(container);
  require('./providers/articlesprovider')(container);
  require('./providers/gifprovider')(container);
  require('./providers/feedsprovider')(container);
  return container;
};
