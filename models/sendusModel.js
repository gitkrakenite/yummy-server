const mongoose = require("mongoose");

const sendUsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    items: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const sendUs = mongoose.model("sendUs", sendUsSchema);

module.exports = sendUs;
