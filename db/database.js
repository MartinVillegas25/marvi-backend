const mysql = require('mysql2')

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
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

