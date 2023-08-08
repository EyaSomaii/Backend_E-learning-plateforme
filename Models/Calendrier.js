const mongoose = require("mongoose");

const Calendrier = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  TitreRoom: {
    type: String,
  },
  lien: {
    type: String,
  },
  formateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});

const Calendriers = mongoose.model("Calendrier", Calendrier);
module.exports = Calendriers;
