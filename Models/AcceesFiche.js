const mongoose = require("mongoose");

const AccesFicheEval = new mongoose.Schema({
  accees: {
    type: Boolean,
    default: true,
  },
  ficheRempli: {
    type: Boolean,
  },
  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "formation",
  },
});

const AccesFicheEvals = mongoose.model("AccesFicheEval", AccesFicheEval);
module.exports = AccesFicheEvals;
