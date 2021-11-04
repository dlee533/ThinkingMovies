const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 8080; //undefined || 8080
const app = express();
const resource = '';

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

//Create connection to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'lthinkingmovies',
    database: 'andiclou_thinking_movies'
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.post(resource, (req, res) => {
    let body = "";
    req.on('data', function (chunk) {
        if (chunk !== null) {
            body += chunk;
        }
    });

    req.on('end', () => {
        let values = JSON.parse(body);
        let sql = `INSERT INTO score(name, score) values ('${values.name}', ${values.score})`;
        db.query(sql, (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(404).send('There is some error here!');
                throw err;
            }
            res.status(200).send(`${values.name}:${values.score} was stored in DB`);
        });
    });
});

app.get(resource, (req, res) => {
    let sql = `SELECT * FROM score`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).send(`${JSON.stringify(result)}`);
    });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port", PORT);
});

// app.listen();