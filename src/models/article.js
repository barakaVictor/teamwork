const BaseModel = require('../app/models/base');

class Article extends BaseModel {
  async update(newObj, selector) {
    const { title, article } = newObj;
    return this.db.one(
      'UPDATE $1:name SET title = $2, article = $3 WHERE $4:name = $4:list RETURNING *',
      [this.table, title, article, selector],
    )
      .then((obj) => obj)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async articleComments() {
    return this.hasMany('articlecomments');
  }
}

module.exports = Article;
