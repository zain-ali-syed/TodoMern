const bcrypt = require("bcrypt");
const saltRounds = 10;

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function comparePasswords(password, encryptedPassword) {
  return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = { encryptPassword, comparePasswords };
