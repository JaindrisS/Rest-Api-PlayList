const { response } = require("express");
const List = require("../models/list");

const getList = async (req, res = response) => {
  const list = await List.find();
  res.status(200).json({ list });
};

const createList = async (req, res = response) => {
  const { ...body } = req.body;

  const list = new List({ ...body });
  list.save();
  res.json({ list });
};

module.exports = { createList, getList };
