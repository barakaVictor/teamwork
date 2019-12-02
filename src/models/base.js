const db = require('../db');

class BaseModel {
  constructor(table) {
    this.db = db;
    this.table = table;
    this.all = this.all.bind(this);
    this.find = this.find.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.truncate = this.truncate.bind(this);
  }

  async find(query) {
    return this.db.any(
      'SELECT * FROM $1:name WHERE $2:name = $2:list',
      [this.table, query],
    )
      .then((obj) => obj)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async all() {
    return this.db.any(
      'SELECT $1:name FROM $2:name',
      ['*', this.table],
    )
      .then((result) => result)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async save(data) {
    return this.db.one(
      'INSERT INTO $1:name($2:name) VALUES($2:list) RETURNING *',
      [this.table, data],
    )
      .then((obj) => obj)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async delete(args) {
    return this.db.none(
      'DELETE FROM $1:name WHERE $2:name = $2:list',
      [this.table, args],
    )
      .then(() => true)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async truncate() {
    return this.db.none(
      'TRUNCATE TABLE $1:name RESTART IDENTITY',
      [this.table],
    )
      .then(() => true)
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = BaseModel;
