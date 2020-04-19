const BaseModel = require('../app/models/base');

class Article extends BaseModel {
  async update(updatedObj, selector) {
    const { title, article } = updatedObj;
    return this.db.one(
      'UPDATE $1:name SET title = $2, article = $3 WHERE $4:name = $4:list RETURNING *',
      [this.table, title, article, selector],
    )
      .then((obj) => obj)
      .catch((error) => {
        throw error;
      });
  }

  async articleComments() {
    return this.hasMany('articlecomments');
  }
}

module.exports = Article;
