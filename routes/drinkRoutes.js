const express = require("express");
const router = express.Router();

const {
  createDrink,
  fetchDrinks,
  likeDrink,
  fetchDrinkBasedOnSth,
  deleteDrink,
  commentOnDrink,
  fetchSpecificDrink,
  updateSpecificDrink,
} = require("../controllers/drinkController");

router.post("/create", createDrink); //create drink
router.put("/edit/:id", updateSpecificDrink); // edit drink
router.get("/all", fetchDrinks); // see all drinks
router.delete("/delete/:id", deleteDrink); // delete drink
router.get("/specific/:id", fetchSpecificDrink); //specific drink
router.post("/comment/:id", commentOnDrink); //comment on drink
router.post("/like/:id", likeDrink); //like drink

module.exports = router;
