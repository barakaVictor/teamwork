const http = require('http');
const createContainer = require('./src/bootstrap')
const container = createContainer();
const app = require('./src').createApp(container)

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const server = http.createServer(app);

server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Server listening on ${bind}`);
});

const port = normalizePort(process.env.PORT || '3000');
server.listen(port);
