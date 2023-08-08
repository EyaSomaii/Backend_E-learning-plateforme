const mongoose = require("mongoose");

const Chapitre = new mongoose.Schema({
  TitreChap: {
    type: String,
  },
  lecon: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
});
const Chapitres = mongoose.model("Chapitre", Chapitre);
module.exports = Chapitres;
