const mongoose = require("mongoose");

const Certification = new mongoose.Schema({
  certif: {
    type: String,
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

const Certifications = mongoose.model("Certification", Certification);
module.exports = Certifications;
