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
    user: 'root',
    password: '',
    database: 'bucketlist',
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port", PORT);
});

// // app.listen();