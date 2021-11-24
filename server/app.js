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

const createToken = require('./modules/createToken');
const checkAPIKey = require('./modules/checkAPIKey');
const errorHandler = require('./modules/errorHandler');
const recordStats = require('./modules/recordStats');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // TODO: after deploying the program, set the access-control-allow-origin to exact value and replace below lines with next();
    if (req.method == "OPTIONS") res.status(200).send();
    else next();
});

// middleware to record every stats
app.use(recordStats);

// middleware to check Authorization token passed in header
app.use(resource + '/admins', checkAPIKey);
app.use(resource + '/users', checkAPIKey);

app.post(resource + '/adminLogin', authController.adminLogin);
app.get(resource + '/admins/stats', adminController.getStats);
app.get(resource + '/admins/verify', authController.verifyLogin);


app.post(resource + '/userLogin', authController.userLogin);
app.post(resource + '/register', authController.register);

app.get(resource + '/movies', movieController.getAllMovies);

app.post(resource + '/users/:uid/bucketlist/:bid', movieController.addMovies);


app.get(resource +'/bucketlists', (req, res) => {
  let sql = `SELECT * FROM bucketlist`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          throw err;
      }
      res.status(200).send(`${JSON.stringify(result)}`);
  });
});

app.get(resource + '/movielists', (req, res) => {
  let sql = `SELECT * FROM bucketlist`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          throw err;
      }
      res.status(200).send(`${JSON.stringify(result)}`);
  });
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
      // let sql = `INSERT INTO bucketlist(username, email) values ('${values.username}', ${values.email})`;
      // let sql = `INSERT INTO bucketlist(username, email) values ('test', '123@gmail.com')`;
      db.query(sql, (sqlErr, sqlRes) => {
          if (sqlErr) {
              res.status(404).send('There is some error here!');
              throw err;
          }
          res.status(200).send(`info is stored in DB`);
      });
  });
});

app.use(errorHandler);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("listening to port", PORT);
});
