const conn = require('../modules/db');

exports.getAllStats = () => {
  const q = `SELECT * FROM stats`;
  return new Promise((resolve, reject) => {
    conn.query(q, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}

exports.getStat = (method, endpoint) => {
  const q = `SELECT * FROM stats
             WHERE method = "${method}" AND endpoint = "${endpoint}"`;
  return new Promise( async(resolve, reject) => {
   conn.query(q, (err, result) => {
     if (err) reject(err);
     else if (result.length == 0) resolve(createEntry(method, endpoint))
     else resolve(result);
   })
  })
}

const createEntry = (method, endpoint) => {
  const q = `INSERT INTO stats(method,endpoint) values("${method}","${endpoint}")`;
  return new Promise((resolve, reject) => {
   conn.query(q, (err, result) => {
     if (err) reject(err);
     else resolve(result);
   })
  })
}

exports.incrementCount = (result) => {
  const id = result[0] ? result[0].id : result.insertId;
  const q = `UPDATE stats SET count = count + 1 WHERE id = "${id}"`;
  return new Promise((resolve, reject) => {
   conn.query(q, (err, result) => {
     if (err) reject(err);
     else resolve(result);
   })
  })
}
