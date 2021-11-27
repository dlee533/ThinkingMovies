const db = require('./db');

const checkAPIKey = (req, res, next) => {
  let apiKey = req.headers.authorization;
  apiKey = (typeof(apiKey) === 'string' && apiKey.split(' ')[0] === 'Basic') ? apiKey.split(' ')[1] : null;
  const q = `SELECT * FROM apiKey WHERE apiKey="${apiKey}"`;

  const verifyKey = (result) => {
    const urlArr = req.originalUrl.split('/');
    let user_id;
    for (let i = 0; i < urlArr.length; i++) {
      if (urlArr[i] == "users") {
        user_id = urlArr[i+1];
        break;
      }
      if (urlArr[i] == "admins") {
        user_id = 1;
        break;
      }
    }
    console.log(user_id);
    if (result.length === 0 || (user_id!=result[0].user_id)){
      throw new Error("Invalid API Key");
    }
    req.userId = result[0].user_id;
  }

  const onError = (err) => {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message
    });
  }

  db.promise(q)
    .then(verifyKey)
    .then(next)
    .catch(onError);
}

module.exports = checkAPIKey;