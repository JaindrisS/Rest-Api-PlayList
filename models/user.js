const { Schema, model, SchemaTypes, Model } = require("mongoose");

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

    list: {
      type: SchemaTypes.ObjectId,
      ref: "",
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
