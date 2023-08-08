const asyncHandler = require("express-async-handler");
const User = require("../Models/Utilisateur");
const Forum = require("../Models/Forum");

const allForumMessages = asyncHandler(async (req, res) => {
  try {
    const forum = await Forum.find({ Module: req.params.ModuleId })
      .populate("sender", "nom image email prenom")
      .populate("Module");
    res.json(forum);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const AjouterCommentaire = asyncHandler(async (req, res) => {
  const { content, Module, image } = req.body;
  //if (!content || !ModuleId) {
  // console.log("Invalid data passed into request");
  // return res.sendStatus(400);
  //}
  console.log(req.body.image);
  if (req.body.image === undefined) {
    console.log("undi");
    var newMessage = {
      sender: req.params.userId,
      content: content,
      Module: Module,
    };
    try {
      var message = await Forum.create(newMessage);
      message = await message.populate("sender", "name image");
      message = await message.populate("Module");

      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  } else {
    console.log("def");

    var newMessage = {
      sender: req.params.userId,
      content: content,
      Module: Module,
      image: "http://localhost:3001/Uploads/" + image,
    };
    try {
      var message = await Forum.create(newMessage);
      message = await message.populate("sender", "name image");
      message = await message.populate("Module");

      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
/**SupprimerCommentaire */
const SupprimerCommentaire = async (req, res) => {
  console.log(req.params.ForumId);
  try {
    const forum = await Forum.findByIdAndDelete(req.params.ForumId);
    console.log(forum, "Deleted");
    res.status(200).json({
      success: "True",
      data: forum,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};

module.exports = { SupprimerCommentaire, allForumMessages, AjouterCommentaire };
