const initOptions = {
  query(e) {
    console.log('QUERY:', e.query);
  },
};

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const pgp = require('pg-promise')(initOptions);

const db = pgp(cn);

module.exports = db;
