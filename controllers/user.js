const { response } = require("express");
const User = require("../models/user");

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

module.exports = { signIn };
