const mongoose = require("mongoose");

const waitlistEntrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 200,
      index: true,
    },
    projectType: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    source: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "unknown",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("WaitlistEntry", waitlistEntrySchema);
