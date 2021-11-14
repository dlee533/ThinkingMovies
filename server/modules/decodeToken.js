const jwt = require('jsonwebtoken');
const SECRET = "secret";
const user = require('../models/user');

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  token = (typeof(token) === 'string' && token.split(' ')[0] === 'Bearer') ? token.split(' ')[1] : null;
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'jwt verification - not logged in'
    })
  }

  const verifyToken = () => {
    return new Promise(
    (resolve, reject) => {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      })
    })
  }

  const setDecoded = (decoded) => {
    req.decoded = decoded;
    return decoded
  }

  const checkUserType = (userInfo) => {
    if ((req.originalUrl.includes('/user/') && userInfo.isAdmin) ||
        (req.originalUrl.includes('/admin/') && !userInfo.isAdmin)) {
          throw new Error('could not match user type');
        }
  }

  const onError = (err) => {
    res.status(403).json({
      success: false,
      message: "jwt verification - " + err.message
    });
  }

  verifyToken().then(setDecoded)
               .then(user.findUserByEmail)
               .then(checkUserType)
               .then(next)
               .catch(onError);
}

module.exports = authMiddleware;
