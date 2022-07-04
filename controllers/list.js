const { response } = require("express");
const List = require("../models/list");

const getList = async (req, res = response) => {
  const list = await List.find({ status: true })
    .populate({ path: "user", select: "name" })
    .populate({
      path: "songs.artist",
      select: "name",
    })
    .populate({ path: "songs.gender", select: { name: true, _id: true } });

  res.status(200).json({ list });
};

const createList = async (req, res = response) => {
  const { ...body } = req.body;

  const list = new List({ ...body });

  list.save();

  res.status(201).json({ list });
};

const deleteList = async (req, res = response) => {
  const { id } = req.params;

  const list = await List.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  const { namelist } = list;

  res.status(200).json({
    msg: "List delete ok",
    namelist,
  });
};

module.exports = { createList, getList, deleteList };
