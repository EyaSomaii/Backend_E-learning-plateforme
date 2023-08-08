const express = require("express");
const router = express.Router();
const ChatRoomController = require("../controllers/ChatRoomController");

router
  .post("/AccesChatRoom/:userId", ChatRoomController.AccesChatRoom)
  .get(
    "/GetUserChatsByIdUser/:userId",
    ChatRoomController.RecupererMesDiscussions
  );

module.exports = router;
