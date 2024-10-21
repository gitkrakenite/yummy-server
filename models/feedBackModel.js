const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    message: { type: String, required: true },
    sender: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
