const mongoose = require("mongoose");

const Lesson = new mongoose.Schema({
  titre: {
    type: String,
  },
  video: [],

  Docs: [
    {
      type: Object,
    },
  ],
  Quiz: [
    {
      type: Object,
    },
  ],
  texte: [
    {
      type: String,
    },
  ],

  desc: {
    type: String,
    max: 500,
  },
  img: {
    type: String,
  },
  Depots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Depot",
    },
  ],
  Etudiants: [{ type: String }],
  ChapId: { type: String },
});

const Lessons = mongoose.model("Lesson", Lesson);
module.exports = Lessons;
