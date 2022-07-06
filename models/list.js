const { Schema, model, SchemaTypes } = require("mongoose");

const ListSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },

    namelist: {
      type: String,
      require: true,
    },

    status: {
      type: Boolean,
      default: true,
    },

    songs: [
      {
        title: {
          type: String,
        },
        artist: {
          type: SchemaTypes.ObjectId,
          ref: "Artist",
        },
        gender: {
          type: SchemaTypes.ObjectId,
          ref: "Gender",
        },

        status: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("List", ListSchema);
