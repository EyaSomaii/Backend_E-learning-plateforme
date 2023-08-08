const mongoose = require("mongoose");

const Depot = new mongoose.Schema({
  Titre: {
    type: String,
  },
  Datedebut: {
    type: Date,
  },
  Datefin: {
    type: Date,
  },
  Docs: {
    type: String,
  },
  lessonId: {
    type: String,
  },
});

const Depots = mongoose.model("Depot", Depot);
module.exports = Depots;
