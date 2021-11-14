const mysql = require('mysql');

//Create connection to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bucketlist',
    multipleStatements: true,
});

// online database credentials
/*
    host: "quebec.gendns.com",
    user: "andiclou_admin",
    password: "movie123",
    database: "andiclou_thinking_movies"
*/

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to mysql");
});

module.exports = db;