const db = require('../modules/db');
const createToken = require('../modules/createToken');

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

exports.adminLogin = (req, res, next) => {

  const sql = `SELECT * FROM user WHERE username="${req.body.username}" AND isAdmin=1`;
  console.log(sql);

  const checkPassword = async (user) => {
    if (user.length == 0) throw new Error("invalid credential");

    user = user[0];
    if (!await bcrypt.compare(req.body.password, user.password)) throw new Error("incorrect password");
    return user;
  }

  const getAPIKey = (user) => {
    const q = `SELECT * FROM apiKey WHERE user_id=${user.id}`;
    return db.promise(q);
  }

  const respond = (result) => {
    console.log(result);
    res.json({
      message: "admin successfully logged in",
      apiKey: result[0].apiKey
    });
  }

  db.promise(sql)
    .then(checkPassword)
    .then(getAPIKey)
    .then(respond)
    .catch(next);
}

exports.userLogin = (req, res, next) => {

  const sql = `SELECT * FROM user WHERE email="${req.body.email}" AND isAdmin=0`;

  const checkPassword = async (user) => {
    if (user.length == 0) throw new Error("email doens't exist");

    user = user[0];
    if (!await bcrypt.compare(req.body.password, user.password)) throw new Error("incorrect password");
    return user;
  }

  const getAPIKey = (user) => {
    const q = `SELECT * FROM apiKey WHERE user_id=${user.id}`;
    return db.promise(q);
  }

  const respond = (result) => {
    res.json({
      message: "user successfully logged in",
      apiKey: result[0].apiKey,
      id: result[0].user_id
    });
  }

  db.promise(sql)
    .then(checkPassword)
    .then(getAPIKey)
    .then(respond)
    .catch(next);
}

exports.register = (req, res, next) => {

  const getUserSQL = async() => {
    const sql = `INSERT INTO user(username, email, password) values("${req.body.username}", "${req.body.email}", "${await bcrypt.hash(req.body.password, SALT_WORK_FACTOR)}")`;
    return sql;
  }

  const createUser = (sql) => {
    return db.promise(sql)
  }

  const createAPIKey = (result) => {
    const apiKey = require("crypto").randomBytes(8).toString('hex');
    const sql = `INSERT INTO apiKey(user_id, apiKey) VALUES (${result.insertId}, "${apiKey}")`
    return db.promise(sql)
  }

  const respond = (result) => {
    res.json({ message: "user successfully created" });
  }

  getUserSQL().then(createUser)
              .then(createAPIKey)
              .then(respond)
              .catch(next);
}

exports.verifyLogin = (req, res, next) => {
  res.status(200).json({ success: true });
}
