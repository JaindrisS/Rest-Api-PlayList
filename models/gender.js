const { Schema, model } = require("mongoose");

const GenderSchema = new Schema(
  {
    name: { type: String },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Gender", GenderSchema);
