const BaseModel = require('./base');

class ArticleCommentsModel extends BaseModel {
  constructor(table = 'articlecomments') {
    super(table);
  }

  async save(obj) {
    return this.db.one(
      'SELECT FROM $1:name WHERE id = $2',
      ['articles', obj.articleid],
    )
      .then((article) => {
        if (article) {
          return this.db.any(
            'INSERT INTO $1:name($2:name) VALUES($2:list) RETURNING *',
            [this.table, obj],
          )
            .then((comment) => comment)
            .catch((error) => {
              throw new Error(error);
            });
        }
        return null;
      }).catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = ArticleCommentsModel;
