const { Schema, model, SchemaTypes } = require("mongoose");

const ListSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      unique: true,
    },

    songs: [
      {
        artist: {
          type: SchemaTypes.ObjectId,
          ref: "Artist",
        },
        title: {
          type: String,
        },
        gender: {
          type: SchemaTypes.ObjectId,
          ref: "Gender",
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("List", ListSchema);
