const express = require("express");
const router = express.Router();

const {} = require("../controllers/foodController");
const {
  createOrder,
  updateSpecificOrder,
  fetchOrderes,
  deleteOrder,
  fetchSpecificOrder,
  fetchMyOrders,
} = require("../controllers/orderController");

router.post("/create", createOrder); //create order
router.put("/edit/:id", updateSpecificOrder); // update order
router.get("/all", fetchOrderes); // see all orders
router.post("/mine", fetchMyOrders); // see all orders
router.delete("/delete/:id", deleteOrder); // delete order
router.get("/specific/:id", fetchSpecificOrder); //specific order

module.exports = router;
