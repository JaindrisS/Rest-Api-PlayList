const { Schema, model, SchemaTypes } = require("mongoose");

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    img: {
      type: String,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UsersSchema);
