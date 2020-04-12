const Container = require('./container.js');

module.exports = function () {
  const container = new Container();
  require('./providers/articlesprovider.js')(container);

  return container;
};
