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

const updateGender = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params;

  const gender = await Gender.findByIdAndUpdate(id, body, { new: true });

  res.json({ msg: "Gender Update", gender });
};

const deleteGender = async (req, res = response) => {
  const { id } = req.params;

  const gender = await Gender.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({ msg: "Gender Delete", gender });
};

module.exports = { createdGender, getGender, updateGender, deleteGender };
