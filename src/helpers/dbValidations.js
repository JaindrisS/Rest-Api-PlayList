const User = require("../models/user");
const List = require("../models/list");
const Artist = require("../models/artist");
const Gender = require("../models/gender");
const user = require("../models/user");
const req = require("express/lib/request");

// Users
const nameExists = async (name) => {
  const user = await User.findOne({
    name: { $regex: name, $options: "i" },
  });

  if (user) {
    throw new Error(`the name ${user.name} is not available`);
  }
};

const emailExits = async (email) => {
  const user = await User.findOne({ email: { $regex: email, $options: "i" } });
  if (user) {
    throw new Error(`The mail ${email} is not available`);
  }
};

const mailDoesNotExist = async (email) => {
  const user = await User.findOne({ email: { $regex: email, $options: "i" } });
  if (!user) {
    throw new Error(`${email} mail  does not exist`);
  }
};

const IdUserExists = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error(`The id ${id} does not exist`);
  }
};

// Lists
const nameListExists = async (value) => {
  const nameListExists = await List.findOne({
    namelist: { $regex: value, $options: "i" },
  });

  if (nameListExists) {
    throw new Error(`List name already exists`);
  }
};

const idListExist = async (value) => {
  const list = await List.findById(value);

  if (!list) {
    throw new Error(`List id does not exist ${value}`);
  }
};

// Artists
const nameArtistExists = async (value) => {
  let newName = value.split(" ");
  let name = newName[0];

  const artist = await Artist.findOne({
    name: { $regex: name, $options: "i" },
  });

  if (artist) {
    throw new Error(`The name ${name} already exists`);
  }
};

const idArtistExists = async (value) => {
  const artist = await Artist.findById(value);

  if (!artist) {
    throw new Error(`Artist does not exist`);
  }
};

// Gender
const nameGenderExists = async (value) => {
  let newName = value.split(" ");
  let name = newName[0];

  const gender = await Gender.findOne({
    name: { $regex: name, $options: "i" },
  });

  if (gender) {
    throw new Error(`The name ${name} already exists`);
  }
};

const idGenderExists = async (value) => {
  const gender = await Gender.findById(value);

  if (!gender) {
    throw new Error("Id Gender  does not exist ");
  }
};

// Song

const nameSongExists = async (value = "") => {
  const songExists = await List.findOne({
    "songs.title": { $regex: value, $options: "i" },
  });

  if (songExists) {
    throw new Error(`the title of the song ${value} already exists`);
  }
};

const idSongExists = async (value = "") => {
  const idExists = await List.findOne({ "songs._id": value });

  if (!idExists) {
    throw new Error("Song id is not valid or does not exist");
  }
};

// upload img

const permittedCollections = async (collection = "", collections = []) => {
  const includes = collections.includes(collection);

  if (!includes) {
    throw new Error(`collection ${collection} is not permitted`);
  }
  return true;
};

module.exports = {
  nameExists,
  emailExits,
  IdUserExists,
  nameListExists,
  nameArtistExists,
  nameGenderExists,
  idArtistExists,
  idGenderExists,
  idListExist,
  nameSongExists,
  idSongExists,
  permittedCollections,
  mailDoesNotExist,
};
