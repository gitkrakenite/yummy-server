const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    foodItems: [
      {
        foodName: String,
        price: Number,
      },
    ],
    deliveryFee: Number,
    containerFee: Number,
    totalPrice: Number,
    customerName: String,
    creator: String,
    deliveryAddress: String,
  },
  { timestamps: true }
);

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
