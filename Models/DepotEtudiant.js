const mongoose = require("mongoose");

const DepotEtudiant = new mongoose.Schema({
  Docs: {
    type: String,
  },

  IDetu: {
    type: String,
  },
  DateRemise: {
    type: String,
  },
  /**  lessonId: {
    type: String,
  },*/
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  travailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Depot",
  },

  Note: {
    type: String,
    default: "Pas encore validé",
  },
  ModuleId: {
    type: String,
  },
});

const DepotEtudiants = mongoose.model("DepotEtudiant", DepotEtudiant);
module.exports = DepotEtudiants;
