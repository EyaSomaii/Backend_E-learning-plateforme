const mongoose = require("mongoose");

const Formation = new mongoose.Schema({
  Titre: {
    type: String,
  },
  description_courte: {
    type: String,
  },

  Ce_que_vous_apprendez: {
    type: String,
  },

  Prerequis: {
    type: String,
  },

  description: {
    type: String,
  },
  video: {
    type: String,
  },
  Module: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "module",
    },
  ],
  poster: {
    type: String,
  },
});

const Formations = mongoose.model("formation", Formation);
module.exports = Formations;
