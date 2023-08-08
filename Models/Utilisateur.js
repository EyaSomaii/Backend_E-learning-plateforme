const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
    },
    prenom: {
      type: String,
    },
    numTel: {
      type: Number,
    },
    Adresse: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    mot_de_passe: {
      type: String,
    },
    occupation: {
      type: String,
    },
    Role: {
      type: String,
      enum: ["SPAdmin", "Administrateur", "Formateur", "Etudiant"],
    },
    cv: {
      type: String,
    },
    formation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "formation",
      },
    ],
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    Prix: {
      type: Number,
    },
    TestConnection: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
