const ChatRoom = require("../Models/ChatRoom");

//Acces_discussion
exports.AccesChatRoom = async (req, res) => {
  const { reciverId } = req.body;
  var isChatRoom = await ChatRoom.find({
    $and: [
      { users: { $elemMatch: { $eq: req.params.userId } } },
      { users: { $elemMatch: { $eq: reciverId } } },
    ],
  }).populate("users", "-mot_de_passe");
  if (isChatRoom.length > 0) {
    res.send(isChatRoom[0]);
  } else {
    var ChatRoomData = {
      users: [req.params.userId, reciverId],
    };

    try {
      const createdChatRoom = await ChatRoom.create(ChatRoomData);
      const FullChatRoom = await ChatRoom.findOne({
        _id: createdChatRoom._id,
      }).populate("users", "-mot_de_passe");
      res.status(200).json(FullChatRoom);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

//Récupérer_messages_de_user_connecter
exports.RecupererMesDiscussions = async (req, res) => {
  try {
    ChatRoom.find({ users: { $elemMatch: { $eq: req.params.userId } } })
      .populate("users", "-mot_de_passe")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
