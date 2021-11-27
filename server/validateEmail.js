const { validate } = require('deep-email-validator');

module.exports.validateEmail = async function(email) {
  let isValid = await validate({
    email,
    sender: email,
    validateRegex: false,
    validateMx: true,
    validateTypo: false,
    validateDisposable: true,
    validateSMTP: false
  });

  if (!isValid.valid) {
    throw new Error('Invalid email: ${isValid.reason}`);
  };

  return true;
}
