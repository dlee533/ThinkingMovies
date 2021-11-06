const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 8080; //undefined || 8080
const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

//Create connection to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'andiclou_admin',
    password: 'thinkingmovie',
    database: 'andiclou_bucketlist'
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.get(resource, (req, res) => {
    let sql = `SELECT * FROM bucketlist`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).send(`${JSON.stringify(result)}`);
    });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port", PORT);
});

// app.post(resource, (req, res) => {
//     let body = "";
//     req.on('data', function (chunk) {
//         if (chunk !== null) {
//             body += chunk;
//         }
//     });

//     req.on('end', () => {
//         let values = JSON.parse(body);
//         // let sql = `INSERT INTO bucketlist(username, email) values ('${values.username}', ${values.email})`;
//         let sql = `INSERT INTO bucketlist(username, email) values ('test', '123@gmail.com')`;
//         db.query(sql, (sqlErr, sqlRes) => {
//             if (sqlErr) {
//                 res.status(404).send('There is some error here!');
//                 throw err;
//             }
//             res.status(200).send(`info is stored in DB`);
//         });
//     });
// });