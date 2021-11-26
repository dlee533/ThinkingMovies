const db = require('./modules/db');

const IMDB_API_KEY = "k_4qjud0hd";
const axios = require('axios');
const mostPopularMovieEndpoint = "https://imdb-api.com/en/API/MostPopularMovies/";

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//**********************************************************************************************************
// create tables
const queryList = [
  "DROP TABLE IF EXISTS apiKey",
  "DROP TABLE IF EXISTS bucketItem",
  "DROP TABLE IF EXISTS bucketlist",
  "DROP TABLE IF EXISTS user",
  "DROP TABLE IF EXISTS filmItem",
  "CREATE TABLE filmItem (\
   id int(11) AUTO_INCREMENT,\
   title varchar(255),\
   year int(11),\
   image varchar(255),\
   PRIMARY KEY(id))",
  "CREATE TABLE user (\
   id int(11) AUTO_INCREMENT,\
   username varchar(255),\
   email varchar(255),\
   password varchar(255) NOT NULL,\
   isAdmin boolean DEFAULT false,\
   PRIMARY KEY(id),\
   UNIQUE(email))",
  "CREATE TABLE bucketlist (\
   id int(11) AUTO_INCREMENT,\
   name varchar(255),\
   user_id int(11),\
   PRIMARY KEY(id),\
   FOREIGN KEY (user_id) REFERENCES user(id))",
  "CREATE TABLE bucketItem (\
   id int(11) AUTO_INCREMENT,\
   bucketlist_id int(11),\
   item_id int(11),\
   PRIMARY KEY(id),\
   FOREIGN KEY (bucketlist_id) REFERENCES bucketlist(id),\
   FOREIGN KEY (item_id) REFERENCES filmItem(id))",
  "CREATE TABLE apiKey (\
   id int(11) AUTO_INCREMENT,\
   user_id int(11),\
   apiKey varchar(255),\
   stat int(11) DEFAULT 0 NOT NULL,\
   PRIMARY KEY (id),\
   FOREIGN KEY (user_id) REFERENCES user(id))",
  "DROP TABLE IF EXISTS stats",
  "CREATE TABLE stats (\
   id int(11) AUTO_INCREMENT,\
   method varchar(255),\
   endpoint varchar(255),\
   count int(11) DEFAULT 0,\
   PRIMARY KEY(id))"
]

for (let i = 0; i < queryList.length; i++) {
  db.query(queryList[i], (err, res) => {
    if (err) throw err;
    console.log(res);
  })
}

//**********************************************************************************************************
// create admin credential
const getAdminInfoSQL = async () => {
  const admin  = {
      username: "admin",
      email: "admin",
      password: await bcrypt.hash("1234abcd", SALT_WORK_FACTOR),
      isAdmin: true
  }
  return `INSERT INTO user(username,email,password,isAdmin) VALUE("${admin.username}", "${admin.email}", "${admin.password}", ${admin.isAdmin})`;
}

const createAPIKey = (result) => {
  const apiKey = "123"
  return db.promise(`INSERT INTO apiKey(user_id, apiKey) VALUES (${result.insertId}, ${apiKey})`);
}
getAdminInfoSQL().then(db.promise)
                 .then(createAPIKey)
                 .then(console.log)
                 .catch(console.log);

//**********************************************************************************************************
// populate filmItem table w/ imdb api
axios.get(`${mostPopularMovieEndpoint}${IMDB_API_KEY}`)
     .then((res) => {
       res.data.items.forEach((item, i) => {
         const sql = `INSERT INTO filmItem(title, year, image) VALUES("${item.title}", "${item.year}", "${item.image}")`;
         db.promise(sql).catch(console.log);
       });
     })
     .catch((error) => {
       console.log(error);
     })

return;
