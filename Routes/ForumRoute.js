const express = require("express");
const {
  allForumMessages,
  AjouterCommentaire,
  SupprimerCommentaire,
} = require("../controllers/ForumController");

const router = express.Router();

router.route("/AffForum/:ModuleId").get(allForumMessages);
router.route("/:userId").post(AjouterCommentaire);
router.route("/suppCommentaire/:ForumId").delete(SupprimerCommentaire);

module.exports = router;
