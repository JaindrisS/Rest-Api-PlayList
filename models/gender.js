const { Schema, model } = require("mongoose");

const GenderSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Gender", GenderSchema);
