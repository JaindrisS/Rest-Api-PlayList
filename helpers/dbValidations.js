const User = require("../models/user");

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

module.exports = { nameExists, emailExits };
