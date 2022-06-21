const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUsers = async (req, res = response) => {
  const user = await User.find();

  res.status(200).json({
    msg: "Users: ",
    user,
  });
};

const signIn = async (req, res = response) => {
  const { name, password, email } = req.body;

  const salt = bcryptjs.genSaltSync(10);
  const hast = bcryptjs.hashSync(password, salt);

  const data = {
    name,
    password: hast,
    email,
  };

  const user = await new User(data);
  await user.save();
  res.json({ msg: `post`, user });
};

module.exports = { signIn, getUsers };
