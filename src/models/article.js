const BaseModel = require('./base');

class ArticlesModel extends BaseModel {
  constructor(table = 'articles') {
    super(table);
  }
}

module.exports = ArticlesModel;
