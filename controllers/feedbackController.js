const Feedback = require("../models/feedBackModel");
const User = require("../models/userModel");

// create feedback
const createFeedback = async (req, res) => {
  const { message, sender, category } = req.body;

  if (!message || !sender || !category) {
    res.status(404).send("Details missing");
    return;
  }

  try {
    const feedback = await Feedback.create({
      message,
      sender,
      category,
    });

    if (feedback) {
      res.status(201).send(feedback);
      return;
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

const fetchFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ $natural: -1 });
    res.status(200).send(feedback);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const fetchSpecificFeeback = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ _id: req.params.id });
    res.status(200).send(feedback);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const deleteFeedback = async (req, res, next) => {
  // check if feedback exist

  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(400).json({ message: "feedback not found" });
    return;
  }

  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete feedback" });
  }
  // console.log(req.params);
};

module.exports = {
  createFeedback,
  fetchFeedback,
  fetchSpecificFeeback,
  deleteFeedback,
};
