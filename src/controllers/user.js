const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUsers = async (req, res = response) => {
  const user = await User.find({ status: true }, { password: false });

  res.status(200).json({
    msg: "Users: ",
    user,
  });
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

  const findUser = await User.findByIdAndUpdate(id, datos, {
    returnDocument: "after",
    select: "name email createdAt updatedAt img",
  });

  res.status(201).json({ msg: "updated user", findUser });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { returnDocument: "after", select: "name email createdAt updatedAt img" }
  );

  res.status(200).json({ msg: "User Delete", user });
};

module.exports = { getUsers, updateUser, deleteUser };
