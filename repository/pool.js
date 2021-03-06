const sql = require('mssql');

const config = {
    host:'localhost',
    user:'admin',
    password:'pedrolopez',
    database:'futbolDB',
    server:'localhost\\SQLEXPRESS',
    parseJSON: true
}

const poolPromise = new sql.ConnectionPool(config)
                .connect()
                .then(pool => {
                    console.log('Connected to localhost '+ config.database +' database');
                    return pool;
                })
                .catch(err => console.log('Database connection failed. Error: ', err));
module.exports = {
    sql, 
    poolPromise,
    config
}