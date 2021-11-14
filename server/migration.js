const db = require('./modules/db');
// const { createAdmin } = require('./models/user');
// const { encryptPassword } = require('./modules/password');

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const queryList = [
  "DROP TABLE IF EXISTS bucketItem",
  "DROP TABLE IF EXISTS bucketlist",
  "DROP TABLE IF EXISTS user",
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
   name varchar(255),\
   bucketlist_id int(11),\
   PRIMARY KEY(id),\
   FOREIGN KEY (bucketlist_id) REFERENCES bucketlist(id))",
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

const getAdminInfoSQL = async () => {
  const admin  = {
      username: "admin",
      email: "admin",
      password: await bcrypt.hash("1234abcd", SALT_WORK_FACTOR),
      isAdmin: true
  }
  return `INSERT INTO user(username,email,password,isAdmin) VALUE("${admin.username}", "${admin.email}", "${admin.password}", ${admin.isAdmin})`;
}



getAdminInfoSQL().then(db.promise)
                 .then(console.log)
                 .catch(console.log);
