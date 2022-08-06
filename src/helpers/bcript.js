const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const hash = (rounds, password) => {
  const salt = genSaltSync(rounds);
  const hast = hashSync(password, salt);

  return hast;
};

const comparePassword = (passwordToConpare, passwordHast) => {
  let conpare = compareSync(passwordToConpare, passwordHast);
  return conpare;
};

module.exports = { hash, comparePassword };
