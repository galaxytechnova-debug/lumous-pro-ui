const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 250,
    },
    html: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 50000000000,
    },
    prompt: {
      type: String,
      default: "",
      maxlength: 50000000000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Template", templateSchema);
