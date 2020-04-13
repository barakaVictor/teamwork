const QueryFile = require('pg-promise').QueryFile;
var normalizedPath = require("path").join(__dirname, "sql");

async function generateTables(db){
    return require("fs")
    .readdir(normalizedPath)
        .then((files) => {
            files.forEach((file)=>{
                let queryfile = new QueryFile(`${normalizedPath}/${file}`, {minify: true})
                db.none(queryfile)
            })
        }).catch((error)=>{
            throw new Error(error)
        })
}

module.exports = {
    generateTables,
};