const { response } = require("express");
const Gender = require("../models/gender");

const createdGender = async (req, res = response) => {
  const { name } = req.body;

  const gender = new Gender({ name });
  await gender.save();
  res.json({ gender });
};

module.exports = { createdGender };
