const { response } = require("express");
const User = require("../models/user");

const getUsers = async (req, res = response) => {
  const user = await User.find();

  res.status(200).json({
    msg: "Users: ",
    user,
  });
};

const signIn = async (req, res = response) => {
  const { id, name, password, img, email } = req.body;

  const data = {
    name,
    password,
    email,
  };

  const user = await new User(data);
  await user.save();
  res.json({ msg: `post`, user });
};

module.exports = { signIn, getUsers };
