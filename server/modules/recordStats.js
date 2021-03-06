const db = require('../modules/db');
const endpoint = "/API/v1";

const recordStats = (req, res, next) => {
  if (!req.path.includes(endpoint)) next();
  if (req.method === "OPTIONS") next();

  // check if endpoint exists in config file
  // TODO: put all const endpoints in config file
  const getSQL = `SELECT * FROM stats WHERE method = "${req.method}" AND endpoint = "${req.path}"`;
  console.log(`method = "${req.method}" AND endpoint = "${req.path}`);

  const checkStatExists = (result) => {
    if (result.length == 1) return result;
    const createSQL = `INSERT INTO stats(method,endpoint) values("${req.method}","${req.path}")`;
    return db.promise(createSQL);
  }

  const incrementStat = (result) => {
    const id = result[0] ? result[0].id : result.insertId;
    const incrementSQL = `UPDATE stats SET count = count + 1 WHERE id = "${id}"`;
    return db.promise(incrementSQL);
  }

  const incrementAPIKeyStat = (result) => {
    if (!req.userId) next;
    else {
      const incrementSQL = `UPDATE apiKey SET stat=stat+1 WHERE user_id = "${req.userId}"`;
      return db.promise(incrementSQL);
    }
  }

  db.promise(getSQL)
    .then(checkStatExists)
    .then(incrementStat)
    .then(incrementAPIKeyStat)
    .then(result => next());

}

module.exports = recordStats;
