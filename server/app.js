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
 */
app.get(resource + '/buckets', (req, res) => {
  const sql = [
    'SELECT * FROM bucketlist',
    'SELECT * FROM bucketitem WHERE bucketlist_id IN (SELECT id FROM bucketlist)'
  ];
  db.query(sql.join(';'), (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).send(`${JSON.stringify(result)}`);
  });
})

/**
 * Add a bucket item
 */
app.post(resource + '/buckets/:bucket_id/items', (req, res) => {
  let body = "";
  req.on('data', function (chunk) {
      if (chunk !== null) {
          body += chunk;
      }
  });
 
  req.on('end', () => {
    //@todo change hardcoded bucketlist_id
      let user_input = JSON.parse(body);
      let sql = `INSERT INTO bucketitem(name, bucketlist_id) values ('${user_input.name}', 2)`;
      db.query(sql, (sqlErr, sqlRes) => { 
          if (sqlErr) {
              res.status(404).send('There is some error here!');
              throw err;
          }
          res.status(200).send(`${user_input.name} is stored into bucketitem table`);
      });
  });
})

/**
 * Add a bucketlist
 */
 app.post(resource+'/buckets', (req, res) => {
  let body = "";
  req.on('data', function (chunk) {
      if (chunk !== null) {
          body += chunk;
      }
  });

  req.on('end', () => {
    //@todo change hardcoded user_id
      let user_input = JSON.parse(body);
      let sql = `INSERT INTO bucketlist(name, user_id) values ('${user_input.name}', 1)`;
      db.query(sql, (sqlErr, sqlRes) => { 
          if (sqlErr) {
              res.status(404).send('There is some error here!');
              throw err;
          }
          res.status(200).send(`${user_input.name} is stored into bucketlist table`);
      });
  });
})

/**
 * Update bucket item
 */
app.put(resource + '/buckets/:bucket_id/items/:item_id', (req, res) => {
  let body = "";
  req.on('data', function (chunk) {
      if (chunk !== null) {
          body += chunk;
      }
  });
 
  req.on('end', () => {
    //@todo change hardcoded bucketlist_id
      let user_input = JSON.parse(body);
      let sql = `UPDATE bucketitem\ SET name=${user_input.name}\ WHERE bucketlist_id=2`;
      db.query(sql, (sqlErr, sqlRes) => { 
          if (sqlErr) {
              res.status(404).send('There is some error here!');
              throw err;
          }
          res.status(200).send(`${user_input.name} is stored into bucketitem table`);
      });
  });
})

/**
 * Update bucket LIST
 */
 app.put(resource + '/buckets/:bucket_id', (req, res) => {
  let body = "";
  req.on('data', function (chunk) {
      if (chunk !== null) {
          body += chunk;
      }
  });
 
  req.on('end', () => {
    //@todo change hardcoded bucketlist_id
      let user_input = JSON.parse(body);
      let sql = `UPDATE bucketlist\ SET name=${user_input.name}\ WHERE user_id=1`;
      db.query(sql, (sqlErr, sqlRes) => { 
          if (sqlErr) {
              res.status(404).send('There is some error here!');
              throw err;
          }
          res.status(200).send(`${user_input.name} is stored into bucketitem table`);
      });
  });
})

/**
 * Delete a bucket item
 */
 app.delete(resource + '/buckets/:bucketlist_id/items/:bucket_item', (req, res) => {
  const sql = `DELETE FROM bucketitem WHERE id = something`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).send(`${JSON.stringify(result)}`);
  });
})

/**
 * Delete a bucket LIST
 */
 app.delete(resource + '/buckets/:bucketlist_id', (req, res) => {
  const sql = `DELETE FROM bucketlist WHERE id = something`;
  db.query(sql, (err, result) => {
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