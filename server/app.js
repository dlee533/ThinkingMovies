const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const resource = '/API/v1';
const db = require('./modules/db');

const authController = require('./controllers/auth');
const adminController = require('./controllers/admin');
const movieController = require('./controllers/movie');

const createToken = require('./modules/createToken');
const decodeToken = require('./modules/decodeToken');
const errorHandler = require('./modules/errorHandler');
const recordStats = require('./modules/recordStats');

//middleware to convert into json
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // TODO: after deploying the program, set the access-control-allow-origin to exact value and replace below lines with next();
  if (req.method == "OPTIONS") res.status(200).send();
  else next();
});

// middleware to record every stats
app.use(recordStats);

//middleware to check if method is working
app.use((req, res, next) => {
  console.log('here');
  console.log(req.originalUrl);
  console.log(req.method);
  next();
})

// middleware to check Authorization token passed in header
app.use(resource + '/admins', decodeToken);
app.use(resource + '/users', decodeToken);

app.use(errorHandler);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.code && (err.code >= 100 && err.code < 600) ? err.code : 400;
  res.status(statusCode)
    .json({
      message: err.message
    });
})

/**
 * Get both bucketlist titles from db
 */
app.get(resource + '/users/:uid/bucketlist', (req, res, next) => {
  // const sql = `SELECT * FROM bucketlist WHERE user_id = ${localStorage.getItem('uid')}`;
  // db.query(sql, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     throw err;
  //   }
  //   res.status(200).send(`${JSON.stringify(result)}`);
  // });
  const sql = `SELECT bucketlist.name,filmitem.title,filmitem.year,filmitem.image \
               FROM bucketlist \
               JOIN bucketitem ON bucketlist.id=bucketitem.bucketlist_id \
               JOIN filmitem ON bucketitem.item_id=filmitem.id \
               WHERE bucketlist.user_id=2`;
  const respond = (result) => {
    const obj = {};
    for (const [key, value] of Object.entries(result)) {
      if (obj[value.name]) {
        obj[value.name].push({
          title: value.title,
          year: value.year,
          image: value.image
        })
      } else {
        obj[value.name] = [{
          title: value.title,
          year: value.year,
          image: value.image
        }]
      };
    }
    res.status(200)
       .json(obj);
  }

  db.promise(sql)
    .then(respond)
    .catch(next);
})

app.post(resource + '/adminLogin', authController.adminLogin);
app.get(resource + '/admins/stats', adminController.getStats);
app.get(resource + '/admins/verify', authController.verifyLogin);


app.post(resource + '/userLogin', authController.userLogin);
app.post(resource + '/register', authController.register);

app.get(resource + '/movies', movieController.getAllMovies);
app.post(resource + '/users/:uid/bucketlist/:bid', movieController.addMovies);

app.get(resource + '/movielists', (req, res) => {
  let sql = `SELECT * FROM bucketlist`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).send(`${JSON.stringify(result)}`);
  });
});

/**
 * Post request for bucketlist titles
 */
app.post(resource + '/users/:uid/bucketlist', (req, res) => {
  const bucketlists = req.body;
  const userId = req.params.uid;
  console.log(bucketlists);

  let sql = `INSERT INTO bucketlist(name, user_id) VALUES`;
  bucketlists.forEach((bucket, i) => {
    sql += `("${bucket.name}", "${userId}")`;
    if (i < bucketlists.length-1) {
      sql += ",";
    }
  })

  const respond = (result) => {
    res.status(200).json({
      success: true,
      message: `${JSON.stringify(bucketlists)} were stored in DB`
    })
  }

  const onError = (err) => {
    res.status(404).json({
      sucess: false,
      message: err.message
    })
  }

  db.promise(sql)
    .then(respond)
    .catch(onError);
})
//todo: add delete method
/**
 * Delete request for specific bucketlist title
 */
app.delete(resource + '/users/:uid/bucketlist/:bid', (req, res) => {
  let sql =  `DELETE FROM bucketlist WHERE id = `;
  db.query(sql, [req.params.bid], (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(`${JSON.stringify(result)}`);
  })
})

/**
 * Edit bucketlist page - get bucketlist title
 */
app.get(resource + '/bucketlists/:bid', (req, res) => {
  const bucketListId = req.params.bid;
  let sql = `SELECT bucketlist.name FROM bucketlist WHERE id = ${bucketListId}`;
  db.query(sql, (err, result) => {
    if (err) {
        console.log(err);
        throw err;
    }
    res.status(200).send(`${JSON.stringify(result)}`);
  });
});

/**
 * Edit bucketlist page - get bucketlist items
 */
app.get(resource + '/users/:uid/bucketlist/:bid', (req, res) => {
  const bucketListId = req.params.bid;
	let sql = `SELECT bucketitem.id AS bucketitem_id, filmitem.title AS film_title FROM bucketitem LEFT JOIN filmitem ON bucketitem.item_id = filmitem.id WHERE bucketitem.bucketlist_id = ${bucketListId};`
  db.query(sql, (err, result) => {
    if (err) {
        console.log(err);
        throw err;
    }
    res.status(200).send(`${JSON.stringify(result)}`);
  });
});

/**
 * Edit bucketlist page - delete bucketlist item
 */
app.delete(resource + '/bucketlists/:bid/items/:item_id', (req, res) => {
  const itemId = req.params.item_id;
  let sql = `DELETE FROM bucketitem WHERE id = ${itemId};`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).send(`${JSON.stringify(result)}`);
  });
});

/**
 * Edit bucketlist page - update bucketlist title
 */
app.put(resource + '/bucketlists', (req, res) => {
  const bucketListId = req.body.bucketlist_id;
  const name = req.body.name;
  let sql = `UPDATE bucketlist SET name = "${name}" WHERE id = ${bucketListId};`;
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
