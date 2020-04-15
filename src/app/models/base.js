class BaseModel {
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

  async find(query) {
    return this.db.manyOrNone(
      'SELECT * FROM $1:name WHERE $2:name = $2:list',
      [this.table, query],
    )
      .then((obj) => {
        if(this.isEmpty(obj)){
          return null
        }
        return obj
      })
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
