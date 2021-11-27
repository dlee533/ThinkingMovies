const db = require('./db');

const checkAPIKey = (req, res, next) => {
  let apiKey = req.headers.authorization;
  apiKey = (typeof(apiKey) === 'string' && apiKey.split(' ')[0] === 'Basic') ? apiKey.split(' ')[1] : null;
  const q = `SELECT * FROM apiKey WHERE apiKey="${apiKey}"`;

  const verifyKey = (result) => {
    if (result.length === 0)
      throw new Error("Invalid API Key");
    if (result[0].user_id !== req.params.uid)
      throw new Error("Invalid API Key");
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
