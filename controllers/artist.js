const { response } = require("express");
const Artist = require("../models/artist");

const createdArtists = async (req, res = response) => {
  const { name } = req.body;
  const artist = new Artist({ name });
  await artist.save();
  res.json({ artist });
};
module.exports = { createdArtists };
