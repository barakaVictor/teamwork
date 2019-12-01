const BaseModel = require('./base');

class UserModel extends BaseModel {
  constructor(table = 'users') {
    super(table);
  }

  /*
  * Overrides the super class all() method to retrieve only specific columns from the users table.
  * returns a list of user objects or none.
  */
  async all() {
    return this.db.any(
      'SELECT $(columns:name) FROM $(table:name)',
      {
        columns: ['firstname', 'lastname', 'email', 'department'],
        table: this.table,
      },
    )
      .then((users) => users)
      .catch((error) => {
        throw new Error(error);
      });
  }

  /*
  * Overrrides the super class find method to limit the colums returned in the result set to ensure
  * privacy of confidential field
  *
  * returns a user object or none
  */

  async find(query) {
    return this.db.oneOrNone(
      'SELECT * FROM $(table:name) WHERE email = $(query:list)',
      {
        // columns: ['id', 'firstname', 'lastname', 'email', 'password', 'department'],
        table: this.table,
        query,
      },
    )
      .then((obj) => obj)
      .catch((error) => {
        throw new Error(error);
      });
  }

  /*
  * Overrides the super class save() method to include password hashing functionality before saving
  * to the database.
  *
  * returns true upons successful insertion into the database.
  */

  async save(obj) {
    return this.db.one(
      'INSERT INTO $1:name($2:name) VALUES($2:list) RETURNING id',
      [this.table, obj],
    )
      .then((data) => data.id)
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = UserModel;
