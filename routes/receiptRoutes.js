const express = require("express");
const {
  createReceipt,
  fetchAllReceipts,
  fetchMyReceipts,
  deleteAllReceipts,
  deleteSpecificReceipt,
} = require("../controllers/receiptController");
const router = express.Router();

// /receipts/

router.post("/", createReceipt); //create receipt
router.get("/all", fetchAllReceipts); //all receipts
router.post("/mine", fetchMyReceipts); //my receipts
router.delete("/", deleteAllReceipts); //delete all receipts
router.delete("/:id", deleteSpecificReceipt); //delete all receipts

module.exports = router;
