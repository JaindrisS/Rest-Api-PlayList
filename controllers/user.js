const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUsers = async (req, res = response) => {
  const user = await User.find({ status: true });

  res.status(200).json({
    msg: "Users: ",
    user,
  });
};

const signIn = async (req, res = response) => {
  const { __v, name, password, ...resto } = req.body;

  const salt = bcryptjs.genSaltSync(10);
  const hast = bcryptjs.hashSync(password, salt);

  const data = {
    name: name.toUpperCase(),
    password: hast,
    ...resto,
  };

  const user = await new User(data);
  await user.save();
  res.json({ msg: `post`, user });
};



module.exports = { signIn, getUsers };
