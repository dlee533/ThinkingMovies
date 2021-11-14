const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const resource = '/v1/users/bucketlists';
const db = require('./modules/db');

const authController = require('./controllers/auth');

const user = require('./models/user');
const createToken = require('./modules/createToken');
const decodeToken = require('./modules/decodeToken');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//Create connection to db
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "bucketlist"
// });

// host: "quebec.gendns.com",
//     user: "andiclou_admin",
//     password: "movie123",
//     database: "andiclou_thinking_movies"

//connect to DB
// db.connect((err) => {
//   if (err) throw err;
//   console.log("Connected!");
// });

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

//Get bucketlist and bucketitems from DB
app.get(resource, (req, res) => {
  // const sql = 'SELECT * FROM bucketlist';
  // const sql2 = 'SELECT * FROM bucketitem, bucketlist WHERE bucketlist_id IN (SELECT id FROM bucketlist)';
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
});

// app.post(resource, (req, res) => {
//   let body = "";
//   req.on('data', function (chunk) {
//       if (chunk !== null) {
//           body += chunk;
//       }
//   });

//   req.on('end', () => {
//       let values = JSON.parse(body);
//       let sql = `INSERT INTO bucketlist(name, user_id) values ('${values.name}', ${values.user_Id})`;
//       db.query(sql, (sqlErr, sqlRes) => {
//           if (sqlErr) {
//               res.status(404).send('There is some error here!');
//               throw err;
//           }
//           res.status(200).send(`Bucketlist No.${values.id} is stored in DB`);
//       });
//   });
// });

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("listening to port", PORT);
});