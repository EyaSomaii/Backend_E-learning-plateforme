const mongoose = require("mongoose");

const ChatRoom = mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const ChatRooms = mongoose.model("ChatRoom", ChatRoom);

module.exports = ChatRooms;
