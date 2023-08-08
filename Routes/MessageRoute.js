const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/MessageController");

const router = express.Router();

router.route("/message/:chatId").get(allMessages);
router.route("/:userId").post(sendMessage);

module.exports = router;
