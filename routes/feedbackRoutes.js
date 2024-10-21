const express = require("express");
const router = express.Router();

const {
  createFeedback,
  fetchFeedback,
  fetchSpecificFeeback,
  deleteFeedback,
} = require("../controllers/feedbackController");

router.post("/create", createFeedback); //create feedback
router.get("/all", fetchFeedback); // see all feedback
router.get("/specific/:id", fetchSpecificFeeback);
router.delete("/:id", deleteFeedback);

module.exports = router;
