const mongoose = require("mongoose");

const FicheEvaluation = new mongoose.Schema({
  note1: {
    type: String,
  },
  note2: {
    type: String,
  },
  note3: {
    type: String,
  },
  note4: {
    type: String,
  },
  note5: {
    type: String,
  },
  note6: {
    type: String,
  },
  note7: {
    type: String,
  },
  note8: {
    type: String,
  },
  avis: {
    type: String,
  },
  Etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "formation",
  },
});

const FicheEvaluations = mongoose.model("FicheEvaluation", FicheEvaluation);
module.exports = FicheEvaluations;
