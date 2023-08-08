const mongoose = require("mongoose");

const Module = new mongoose.Schema({
  nom: {
    type: String,
  },
  formateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  chapitres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapitre",
    },
  ],
});

const Modules = mongoose.model("module", Module);
module.exports = Modules;
