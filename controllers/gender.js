const { response } = require("express");
const Gender = require("../models/gender");

const getGender = async (req, res = response) => {
  const gender = await Gender.find();

  res.json({ gender });
};

const createdGender = async (req, res = response) => {
  const { name } = req.body;

  const gender = new Gender({ name });
  await gender.save();
  res.json({ gender });
};

module.exports = { createdGender, getGender };
