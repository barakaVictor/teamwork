const initOptions = {
  query(e) {
    // console.log('QUERY:', e.query);
  },
  extend(obj, dc){
    obj.createTables = () => {
      return "Creating database tables...."
    }
  }
};

function init(initOptions){
  const cn = process.env.DATABASE_URL;
  const pgp = require('pg-promise')(initOptions);
  const db = pgp(cn);
  return db
}



module.exports = { init };
