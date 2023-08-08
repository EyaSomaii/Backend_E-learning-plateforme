const Calendrier = require("../Models/Calendrier");
const RoomMeet = require("../Models/RoomMeet");
const Formations = require("../Models/Formations");
const Users = require("../Models/Utilisateur");
const nodemailer = require("nodemailer");
const moment = require("moment");
const fs = require("fs");
const hogan = require("hogan.js");
const API_KEY = process.env.daily_API_KEY;
require("dotenv").config();
const fetch = require("node-fetch");
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

/**AjuterHeureDeTravail */

exports.AjuterHeureDeTravail = async (req, res) => {
  let info = {
    title: req.body.title,
    formateur: req.params.userId,
    start: req.body.start,
    end: req.body.end,
  };

  canlender = await Calendrier.create(info);
  canlender = await canlender.populate("formateur");
  canlender.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(canlender);
    }
  });
};

/**GetHeureDeTravailParFormateur */

exports.AffHeureDeTravailParFormateur = async (req, res) => {
  const events = await Calendrier.find({
    //start: { $gte: moment(req.query.start).toDate() },
    //end: { $lte: moment(req.query.end).toDate() },
    //formateur: req.body.userId,
  }).populate("formateur");

  res.send(events);
};

/**GetHeureDeTravailParFormateur */

exports.AffHeureDeTravailParFormateurId = async (req, res) => {
  const events = await Calendrier.find({
    formateur: req.params.userId,
    //start: { $gte: moment(req.query.start).toDate() },
    //end: { $lte: moment(req.query.end).toDate() },
    //formateur: req.body.userId,
  }).populate("formateur");

  res.send(events);
};

//Supprimer_Event
exports.SuppEvent = async (req, res) => {
  try {
    const event = await Calendrier.findByIdAndDelete(req.params.userId);
    console.log(event, "Deleted");
    res.status(200).json({
      success: "True",
      data: event,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};
