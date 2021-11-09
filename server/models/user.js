const conn = require('../modules/db');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

exports.findUserByEmail = (user) => {
  const q = `SELECT * FROM user WHERE email = "${user.email}"`;
  return new Promise((resolve, reject) => {
    conn.query(q, (err, result) => {
      if (err) reject(err);
      else if (result.length === 0) reject(new Error("invalid email"));
      else resolve(JSON.parse(JSON.stringify(result[0])));
    })
  })
}

exports.createUser = (user) => {
  return new Promise(async(resolve, reject) => {
    const q = `INSERT INTO user(username, email, password) values("${user.username}", "${user.email}", "${user.password}")`;

    conn.query(q, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
}

exports.createAdmin = (user) => {
  return new Promise((resolve, reject) => {
    const q = `INSERT INTO user SET ?`;

    conn.query(q, user, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
}
