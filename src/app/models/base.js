class BaseModel {
  /**
   * 
   * @param {Database} db - an instance of the database object
   * @param {String} table - the name of the table this model attaches to 
   */
  constructor(db, table) {
    this.db = db;
    this.all = this.all.bind(this);
    this.find = this.find.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.truncate = this.truncate.bind(this);
    this.table = ()=>{
      return (table ? `${table.toLowerCase()}s` : `${this.constructor.name.toLowerCase()}s`)
    }
  }

  isEmpty(data){
    if(typeof(data) == 'number' || typeof(data) == 'boolean'){ 
      return false; 
    }
    if(typeof(data) == 'undefined' || data === null){
      return true; 
    }
    if(typeof(data.length) != 'undefined'){
      return data.length == 0;
    }
    var count = 0;
    for(var i in data){
      if(data.hasOwnProperty(i)){
        count ++;
      }
    }
    return count == 0;
  }

  convertArrayWithSingleObjectToObject(array){
    return array.length == 1 ? array[0]: array
  }

  /**
   * Retrieves a subset of the records from the attached database based
   * on the provided parameters
   * @param {Object} query - key\value pair where the key specifies the column
   * to use and the value specifies the filter condition
   */
  async find(query) {
    return this.db.manyOrNone(
      'SELECT * FROM $1:name WHERE $2:name = $2:list',
      [this.table, query],
    )
      .then((results) => {
        return this.isEmpty(results)? null: this.convertArrayWithSingleObjectToObject(results)
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrives all records from the attached table
   */
  async all() {
    return this.db.any(
      'SELECT $1:name FROM $2:name',
      ['*', this.table],
    )
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Inserts a new record into the attached table 
   * @param {Object} data - an object whose keys match table columns 
   * and the values are the entries to use to populate a table with a record
   */
  async save(data) {
    return this.db.one(
      'INSERT INTO $1:name($2:name) VALUES($2:list) RETURNING *',
      [this.table, data],
    )
      .then((obj) => obj)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes a record from the attached table
   * @param {Object} args - an object with a key\value pair specifying the column
   * and the value to use when selecting a record to delete
   */
  async delete(args) {
    return this.db.none(
      'DELETE FROM $1:name WHERE $2:name = $2:list',
      [this.table, args],
    )
      .then(() => true)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Clears the contents of the attached table and restarts
   * the autoincrement field i.e. id
   */
  async truncate() {
    return this.db.none(
      'TRUNCATE TABLE $1:name RESTART IDENTITY CASCADE',
      [this.table],
    )
      .then(() => true)
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = BaseModel;
