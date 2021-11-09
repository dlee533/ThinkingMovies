const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const bcrypt = require('bcrypt');

const authController = require('./controllers/auth');

const user = require('./models/user');
const createToken = require('./modules/createToken');
const decodeToken = require('./modules/decodeToken');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
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

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("listening to port", PORT);
});
