const mysql = require('mysql2')

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Thiago2507!',
    database: 'marvi_data'
});

dbConnection.connect(function (err){
    if(err){
        console.error(err)
        return
    }else{
        console.log("base de datos conectada")
    }
});

module.exports = dbConnection;

