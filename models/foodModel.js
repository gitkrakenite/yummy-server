const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    onOffer: {
      type: String,
      // required: true,
      default: "no",
    },
    vendor: {
      type: String,
      required: true,
      default: "others",
    },

    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },

    comments: [commentSchema],
    likes: [likeSchema],
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
