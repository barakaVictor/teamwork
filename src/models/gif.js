const BaseModel = require('./base');

class GifModel extends BaseModel {
  constructor(table = 'gifs') {
    super(table);
  }
}

module.exports = GifModel;
