const { response } = require("express");
const List = require("../models/list");
const jwt = require("jsonwebtoken");

const getList = async (req, res = response) => {
  const list = await List.find({ status: true }, { status: false })
    .populate({
      path: "user",
      select: "name",
    })
    .populate({ path: "songs.artist", select: "name" })
    .populate({ path: "songs.gender", select: "name" });
  res.status(200).json({ list });
};

const createList = async (req, res = response) => {
  let { namelist } = req.body;
  const token = req.header("token");
  const { uid } = jwt.verify(token, process.env.JWTPRIVATEKEY);
  const datos = {
    namelist,
    user: uid,
  };
  const list = new List(datos);
  await list.save();

  res.status(201).json({ list });
};

const deleteList = async (req, res = response) => {
  const { id } = req.params;

  const list = await List.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  const { name: namelist } = list;

  res.status(200).json({
    msg: "List delete ok",
    namelist,
  });
};

const updateListName = async (req, res = response) => {
  const { id } = req.params;
  const { namelist } = req.body;

  const listname = await List.findByIdAndUpdate(
    id,
    { namelist },
    { new: true }
  );

  res.json(`List name updated to ${listname.namelist} `);
};

const addNewSong = async (req, res = response) => {
  const { id } = req.params;
  const { title, gender, artist } = req.body;

  const list = await List.findByIdAndUpdate(id, {
    $push: {
      songs: {
        title,
        gender,
        artist,
      },
    },
  });

  console.log(list);

  res.json({ msg: `Song ${title} added ` });
};

const updatedSongName = async (req, res = response) => {
  const { id } = req.params;
  const { title } = req.body;

  const updatename = await List.findOneAndUpdate(
    {
      _id: id,
      "songs._id": req.body.id,
    },

    {
      $set: {
        "songs.$": { title },
      },
    },
    { new: true }
  );

  if (updatename === null) {
    return res.json("Enter the id of a valid song");
  }

  res.json({ msg: "Title successfully updated" });
};

module.exports = {
  createList,
  getList,
  deleteList,
  addNewSong,
  updateListName,
  updatedSongName,
};
