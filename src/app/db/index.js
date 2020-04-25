const QueryFile = require('pg-promise').QueryFile;
var path = require("path")

function fetQueryFiles(path){
  return new Promise((resolve, reject)=>{
    require("fs")
    .readdir(path, (error, files) => {
      error? reject(error) : resolve(files)
    }) 
  })
}

const defaultinitOptions = {
  receive(data, result, e) {
    // console.log(data);
  },
  query(e) {
    //console.log('QUERY:', e.query);
  },
  extend(obj, dc){
    obj.createTables = async () => {
      console.log('Creating database tables....')
      return fetQueryFiles(path.join(__dirname+"/sql/up"))
      .then((files) => {
        for (const file of files) {
          let queryfile = new QueryFile(`${path.join(__dirname+"/sql/up")}/${file}`, { minify: true });
          return obj.none(queryfile)
        }
      })
      .catch((error)=>{throw error})
    },
    obj.dropTables = () => {
      console.log('Clearing database.....')
      let queryfile = new QueryFile(`${path.join(__dirname+"/sql/down/drop_tables.sql")}`, { minify: true });
      return obj.tx(async t =>{
        return await t.any(queryfile);;
      })
  }
}
};

function init(initOptions){
  let dboptions = typeof initOptions !== "undefined"? initOptions : defaultinitOptions
  const cn = process.env.DATABASE_URL;
  const pgp = require('pg-promise')(dboptions);
  const db = pgp(cn);
  return db
}

module.exports = { init };
