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

exports.addMovies = (req, res, next) => {
  const bucketListId = req.params.bid;
  const movies = req.body.movies;
  let sql = `INSERT INTO bucketItem(bucketlist_id, item_id) VALUES`;
  for (let i=0; i<movies.length; i++) {
    sql += ` ("${bucketListId}", "${movies[i]}")`;
    if (i<movies.length-1)
      sql += ",";
  }
  console.log(sql);

  const respond = () => {
    res.json({ success: true });
  }

  db.promise(sql)
    .then(respond)
    .catch(next);
}
