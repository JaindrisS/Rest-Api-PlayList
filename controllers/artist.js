const { response } = require("express");
const Artist = require("../models/artist");

const getArtis = async (req, res = response) => {
  const artist = await Artist.find();

  res.status(200).json({ artist });
};

const createdArtists = async (req, res = response) => {
  const { name } = req.body;
  const artist = new Artist({ name });
  await artist.save();
  res.status(201).json({ artist });
};

const updateArtists = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params;

  const artis = await Artist.findByIdAndUpdate(id, body, { new: true });
  res.status(201).json({ msg: "Artist update", artis });
};

const deleteArtist = async (req, res = response) => {
  const { id } = req.params;

  const artist = await Artist.findByIdAndUpdate(id, {
    status: false,
    new: true,
  });

  res.status(200).json({ msg: "Artist Delete", artist });
};

module.exports = { createdArtists, getArtis, updateArtists, deleteArtist };
