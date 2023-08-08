const mongoose = require("mongoose");

const Room = new mongoose.Schema({
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
  /**TitreRoom: {
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
  },*/
});

const Rooms = mongoose.model("Room", Room);
module.exports = Rooms;
