const mongoose = require("mongoose");
const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASEURL),
      {},
      console.log(`Online database`);
  } catch (error) {
    console.log(error);
    throw new Error(`Error starting database`);
  }
};

module.exports = { mongoConnect };
