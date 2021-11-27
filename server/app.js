const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const resource = '/API/v1';
const db = require('./modules/db');

const authController = require('./controllers/auth');
const adminController = require('./controllers/admin');
const movieController = require('./controllers/movie');
const bucketController = require('./controllers/bucket');

const checkAPIKey = require('./modules/checkAPIKey');
const errorHandler = require('./modules/errorHandler');
const recordStats = require('./modules/recordStats');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://michellehuynh.me');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // TODO: after deploying the program, set the access-control-allow-origin to exact value and replace below lines with next();
    if (req.method == "OPTIONS") res.status(200).send();
    else next();
});

// middlewares
app.use(resource + '/admins', checkAPIKey);
app.use(resource + '/users', checkAPIKey);
app.use(recordStats);

// auth resources
app.post(resource + '/adminLogin', authController.adminLogin);
app.post(resource + '/userLogin', authController.userLogin);
app.post(resource + '/register', authController.register);

// admin resources
app.get(resource + '/admins/stats', adminController.getStats);
app.get(resource + '/admins/verify', authController.verifyLogin);

// user resourcesS
app.get(resource + '/users/:uid/buckets', bucketController.getAllBuckets);
app.post(resource + '/users/:uid/buckets', bucketController.createBucket);

app.get(resource + '/users/:uid/buckets/:bid', bucketController.getBucket);
app.post(resource + '/users/:uid/buckets/:bid', bucketController.addItem);
app.put(resource + '/users/:uid/buckets/:bid', bucketController.updateBucketName);
app.delete(resource + '/users/:uid/buckets/:bid', bucketController.deleteBucket);

app.delete(resource + '/users/:uid/buckets/:bid/items/:iid', bucketController.deleteItem);

// movie resources
app.get(resource + '/movies', movieController.getAllMovies);

// middleware to handle all errors
app.use(errorHandler);

const server = app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("listening to port", PORT);
});

module.exports = server
