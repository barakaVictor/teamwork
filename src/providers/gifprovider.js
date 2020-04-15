const GifModel = require('../models/gif')
const GifController = require('../controllers/gifcontroller')
const GifRoutes = require('../routes/api/v1/gifs')

module.exports = (c) => {
    c.service('GifModel', (c) => new GifModel(c.db, null))
    c.service('GifController', (c) => new GifController(c.GifModel))
    c.service('GifRoutes', (c) => GifRoutes(c.GifController))
}