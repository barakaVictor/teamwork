const BaseModel = require('./base');

class Feed extends BaseModel {
  async join(tb_one, tb_two) {
    let articles = await this.db.any('SELECT * FROM $1:name', [tb_one])
    let gifs = await this.db.any('SELECT * FROM $1:name', [tb_two])
    const feed = articles.concat(gifs)
    return feed
  }
}

module.exports = Feed;
