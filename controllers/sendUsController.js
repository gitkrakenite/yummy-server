const SendUs = require("../models/sendusModel");
const User = require("../models/userModel");

// create sendus
const createSend = async (req, res) => {
  const { username, items, location, phone } = req.body;

  if (!username || !items || !location || !phone) {
    res.status(404).send("Details missing");
    return;
  }

  try {
    const sendUs = await SendUs.create({
      username,
      items,
      location,
      phone,
    });

    if (sendUs) {
      res.status(201).send(sendUs);
      return;
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

const fetchSend = async (req, res, next) => {
  try {
    const sendUs = await SendUs.find().sort({ $natural: -1 });
    res.status(200).send(sendUs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const fetchSpecificSend = async (req, res) => {
  try {
    const sendUs = await SendUs.findOne({ _id: req.params.id });
    res.status(200).send(sendUs);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const deleteSendUs = async (req, res, next) => {
  // check if sendUs exist

  const sendUs = await SendUs.findById(req.params.id);

  if (!sendUs) {
    res.status(400).json({ message: "sendUs not found" });
    return;
  }

  try {
    await SendUs.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete sendus" });
  }
  // console.log(req.params);
};

module.exports = {
  createSend,
  fetchSend,
  fetchSpecificSend,
  deleteSendUs,
};
