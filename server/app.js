const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const resource = '/v1/users';
const db = require('./modules/db');

const authController = require('./controllers/auth');

const user = require('./models/user');
const createToken = require('./modules/createToken');
const decodeToken = require('./modules/decodeToken');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// host: "quebec.gendns.com",
//     user: "andiclou_admin",
//     password: "movie123",
//     database: "andiclou_thinking_movies"

app.use((req, res, next) => {
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

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.code && (err.code >= 100 && err.code < 600) ? err.code : 400;
  res.status(statusCode)
    .json({
      message: err.message
    });
})

/**
 * Get both bucketlist and bucketitems from DB
 * @todo @marooncandy need to grab userId in the url and in define userId in the query
 */
app.get(resource + '/buckets', (req, res) => {
  const sql = [
    'SELECT * FROM bucketlist WHERE user_id = 2',
    'SELECT * FROM bucketitem WHERE bucketlist_id = 1' 
  ];
  db.query(sql.join(';'), (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).send(`${JSON.stringify(result)}`);
  });
})

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("listening to port", PORT);
})