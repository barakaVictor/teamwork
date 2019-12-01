const db = require('../db');

const BaseModel = require('./base');

class GifModel extends BaseModel {
  constructor(table = 'gifs') {
    super(db, table);
  }
}

module.exports = GifModel;
