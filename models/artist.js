const { Schema, model, SchemaTypes } = require("mongoose");

const ArtistsSchema = new Schema(
  {
    name: {
      type: String,
    },

    img: {
      type: SchemaTypes.ObjectId,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Artist", ArtistsSchema);