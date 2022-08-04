const { Schema, model, SchemaTypes } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    resetpassword: {
      type: String,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    img: {
      type: String,
    },

    rol: {
      type: String,
      default: "USER",
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

module.exports = model("User", UserSchema);
