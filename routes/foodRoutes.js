const express = require("express");
const router = express.Router();

const {
  createFood,
  fetchFood,
  deleteFood,
  fetchSpecificFood,
  commentOnFood,
  likeFood,
  updateSpecificFood,
  fetchFoodBasedOnSth,
  fetchFoodOnOffer,
} = require("../controllers/foodController");

router.post("/create", createFood); //create food
router.put("/edit/:id", updateSpecificFood); // edit foos
router.get("/all", fetchFood); // see all food
router.delete("/delete/:id", deleteFood); // delete food
router.get("/specific/:id", fetchSpecificFood); //specific food
router.post("/comment/:id", commentOnFood); //comment on food
router.post("/like/:id", likeFood); //like product
router.post("/vendor", fetchFoodBasedOnSth); //like product
router.post("/offer", fetchFoodOnOffer); //on Offer product

module.exports = router;
