const initOptions = {
  query(e) {
    console.log('QUERY:', e.query);
  },
};

const cn = process.env.DATABASE_URL;

const pgp = require('pg-promise')(initOptions);

const db = pgp(cn);

module.exports = db;
