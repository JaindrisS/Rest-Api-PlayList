const jwt = require("jsonwebtoken");

const generateJwt = (uid = "") => {
  return new Promise((resolve, reject) => {
    let payload = { uid };

    jwt.sign(
      payload,
      process.env.JWTPRIVATEKEY,
      { expiresIn: "12h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("could not generate the jwt");
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = { generateJwt };
