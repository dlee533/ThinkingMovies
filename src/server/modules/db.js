const mysql = require('mysql');

//Create connection to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bucketlist',
});

db.connect((err) => {
    if (err) throw err;
    console.log("connected to mysql");
});

module.exports = db;
