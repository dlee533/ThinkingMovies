const user = require('../models/user');
const createToken = require('../modules/createToken');
const { encryptPassword, comparePassword } = require('../modules/password');

exports.adminLogin = (req, res, next) => {
  req.body.email = req.body.username;

  const checkIfAdmin = (user) => {
    if (!user.isAdmin) throw new Error("invalid credential");
    return user;
  }

  const checkPassword = async (user) => {
    if (!await comparePassword(req.body.password, user.password)) throw new Error("incorrect password");
    return user;
  }

  const respond = (user) => {
    res.json({
      message: "admin successfully logged in",
      token: createToken(user),
    });
  }

  user.findUserByEmail(req.body)
      .then(checkIfAdmin)
      .then(checkPassword)
      .then(respond)
      .catch(next);
}

exports.userLogin = (req, res, next) => {
  const checkPassword = async (user) => {
    if (!await comparePassword(req.body.password, user.password)) throw new Error("incorrect password");
    return user;
  }
  const respond = async(user) => {
    res.json({
      message: "user successfully logged in",
      token: createToken(user),
      id: user.id
    });
  }

  user.findUserByEmail(req.body)
      .then(checkPassword)
      .then(respond)
      .catch(next);
}

exports.register = (req, res, next) => {

  const getUserInfo = async() => {
    req.body.password = await encryptPassword(req.body.password);
    return req.body;
  }

  const respond = (result) => {
    res.json({ message: "user successfully created" });
  }

  getUserInfo().then(user.createUser)
               .then(respond)
               .catch(next);
}
