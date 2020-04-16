const BaseModel = require('./app/base');

class ArticleComment extends BaseModel {
  async save(obj) {
    return this.db.oneOrNone(
      'SELECT * FROM articles WHERE id = $1',
      [obj.articleid],
    ).then((article) => {
      if (!article) {
        throw 'Related article does not exist yet';
      }
      return this.db.one(
        'INSERT INTO $1:name($2:name) VALUES($2:list) RETURNING *',
        [this.table, obj],
      )
        .then((comment) => ({
          comment,
          article,
        }))
        .catch((error) => {
          throw error;
        });
    }).catch((error) => {
      throw error;
    });
  }
}

module.exports = ArticleComment;
