const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

exports.encryptPassword = async (password) => {
  return await bcrypt.hash(password, SALT_WORK_FACTOR);
};

exports.comparePassword = async(unencrypted, encrypted) => {
  return await bcrypt.compare(unencrypted, encrypted);
}
