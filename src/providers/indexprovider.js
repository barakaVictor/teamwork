const IndexRoute = require('../routes/api/v1')

module.exports = (c) => {
    
    c.service('IndexRoute', (c) => IndexRoute())
}