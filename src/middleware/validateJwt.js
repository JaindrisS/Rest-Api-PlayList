const { response } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const validateJwt = async (req, res = response, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json("Enter a token in the request");
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWTPRIVATEKEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({ msg: "User does not exist invalid token" });
    }

    if (!user.status) {
      return res.status(401).json({ msg: "Invalid token - status false" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Invalid token" });
  }
};
module.exports = validateJwt;
