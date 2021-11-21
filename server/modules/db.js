const mysql = require('mysql');

//Create connection to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'mygadgnt_admin',
    password: 'movie123',
    database: 'mygadgnt_bucketlist',
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

db.promise = (sql) => {
  return new Promise((res, rej) => {
    db.query(sql, (err, result) => {
      if (err) rej(err);
      else res(result);
    })
  })
}

module.exports = db;
