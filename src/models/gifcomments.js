const BaseModel = require('../app/models/base');

class GifComment extends BaseModel {
  async save(obj) {
    return this.db.oneOrNone(
      'SELECT * FROM gifs WHERE id = $1',
      [obj.gifid],
    ).then((gif) => {
      if (!gif) {
        throw new 'Related gif does not exist yet';
      }
      return this.db.one(
        'INSERT INTO $1:name($2:name) VALUES($2:list) RETURNING *',
        [this.table, obj],
      )
        .then((comment) => ({
          comment,
          gif,
        }))
        .catch((error) => {
          throw error;
        });
    }).catch((error) => {
      throw error;
    });
  }
}

module.exports = GifComment;
