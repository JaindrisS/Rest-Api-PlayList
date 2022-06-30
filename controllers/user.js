const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJwt } = require("../helpers/generatejwt");

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

const logIn = async (req, res = response) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne(
      { email: { $regex: email, $options: "i" } },
      { name: 1, password: 1, email: 1, status: 1 }
    );

    if (!user) {
      return res.status(400).json({ msg: `Invalid email ${email}` });
    }

    if (!user.status) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const userValid = bcryptjs.compareSync(password, user.password);

    if (!userValid) {
      return res.status(400).json({ msg: `Incorrect password` });
    }

    const token = await generateJwt(user.id);

    res.status(200).json({
      msg: `Login ok`,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return new Error("Communicate with the administrator");
  }
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { img, name, email, ...resto } = req.body;

  if (resto.password) {
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(resto.password, salt);
  }

  const datos = {
    img,
    name,
    email,
    password: resto.password,
  };

  const user = await User.findByIdAndUpdate(id, datos);

  if (user.status === false) {
    return res.status(400).json({ msg: "User not available" });
  }
  res.json({ user });
};

module.exports = { signIn, getUsers, logIn, updateUser };
