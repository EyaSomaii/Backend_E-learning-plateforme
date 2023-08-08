const mongoose = require("mongoose");

const ForumSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    content: { type: String, trim: true },
    Module: { type: mongoose.Schema.Types.ObjectId, ref: "module" },
    image: { type: String },
    //readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
  //, toJSON: { virtuals: true }
);

const Forum = mongoose.model("Forum", ForumSchema);
module.exports = Forum;
