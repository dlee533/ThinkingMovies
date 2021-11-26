const db = require('../modules/db');

exports.getAllMovies = (req, res, next) => {
  const sql = `SELECT * FROM filmItem`;

  const respond = (movies) => {
    res.json({movies: movies});
  }

  db.promise(sql)
    .then(respond)
    .catch(next);
}

exports.addItem = (req, res, next) => {
  const bucketListId = req.params.bid;
  const film_id = req.body.fid;
  let sql = `INSERT INTO bucketItem(bucketlist_id, item_id) VALUES(${req.params.bid}, ${req.body.fid})`;

  const respond = () => {
    res.json({ success: true });
  }

  db.promise(sql)
    .then(respond)
    .catch(next);
}
