const conn = require('./modules/db');
const { createAdmin } = require('./models/user');
const { encryptPassword } = require('./modules/password');

const queryList = [
  "DROP TABLE IF EXISTS user",
  
  "CREATE TABLE user (\
   id int(11) AUTO_INCREMENT,\
   username varchar(255),\
   email varchar(255),\
   password varchar(255) NOT NULL,\
   isAdmin boolean DEFAULT false,\
   PRIMARY KEY(id),\
   UNIQUE(email))",
]

for (let i = 0; i < queryList.length; i++) {
  conn.query(queryList[i], (err, res) => {
    if (err) throw err;
    console.log(res);
  })
}

const getAdminInfo = async () => {
  const admin  = {
      username: "admin",
      email: "admin",
      password: await encryptPassword('1234abcd'),
      isAdmin: true
  }
  return admin;
}

getAdminInfo().then(createAdmin)
              .then(console.log)
              .catch(console.log);
