const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const resource = '/API/v1';

const authController = require('./controllers/auth');

const user = require('./models/user');
const createToken = require('./modules/createToken');
const decodeToken = require('./modules/decodeToken');
const errorHandler = require('./modules/errorHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

<<<<<<< HEAD
app.use(function(req, res, next) {
    console.log(`Request: ${req.method}, ${req.path}`);
=======
//Create connection to db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bucketlist"
});

// host: "quebec.gendns.com",
//     user: "andiclou_admin",
//     password: "movie123",
//     database: "andiclou_thinking_movies"


db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});


app.use((req, res, next) => {
>>>>>>> 89df77ae9a6b9f65af02d67692ad3dde0c8a7307
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use('/admin', decodeToken);
app.use('/user', decodeToken);

app.post('/adminLogin', authController.adminLogin);
app.post('/userLogin', authController.userLogin);
app.post('/register', authController.register);

app.use(errorHandler);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("listening to port", PORT);
});


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
