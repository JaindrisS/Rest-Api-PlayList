const User = require("../models/user");
const List = require("../models/list");
const Artist = require("../models/artist");
const Gender = require("../models/gender");

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

// Lists
const IdUserExists = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error(`The id ${id} does not exist`);
  }
};

const nameListExists = async (name) => {
  const nameList = await List.findOne({
    name: { $regex: name, $options: "i" },
  });

  if (nameList) {
    throw new Error(`List name already exists`);
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

module.exports = {
  nameExists,
  emailExits,
  IdUserExists,
  nameListExists,
  nameArtistExists,
  nameGenderExists,
};
