const express = require("express");
const router = express.Router();

const {
  createSend,
  fetchSend,
  fetchSpecificSend,
  deleteSendUs,
} = require("../controllers/sendUsController");

router.post("/create", createSend); //create send
router.get("/all", fetchSend); // see all send
router.get("/specific/:id", fetchSpecificSend); //specific send
router.delete("/:id", deleteSendUs); //delete send

module.exports = router;
