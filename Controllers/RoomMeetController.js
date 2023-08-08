const RoomMeet = require("../Models/RoomMeet");
const Calendrier = require("../Models/Calendrier");
const Formations = require("../Models/Formations");

const Users = require("../Models/Utilisateur");

const API_KEY = process.env.daily_API_KEY;
require("dotenv").config();
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const moment = require("moment");
const fs = require("fs");
const hogan = require("hogan.js");
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};
const createRoom = (room) => {
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("error:" + err));
};
//NodeMailer
const mail = (mail, nom, prenom, start, end, formation, module, lien) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eya.somai134t@gmail.com",
      pass: "ewofuxjfibdffnvv",
    },
    secure: false,
  });
  const templateFile = fs.readFileSync("mail_meet.html", "utf8");

  const templateCompiled = hogan.compile(templateFile);

  let mailOptions = {
    from: "eya.somai134t@gmail.com",
    to: mail,
    subject: "yocareer Account",
    html: templateCompiled.render({
      nom: nom,
      prenom: prenom,
      formation: formation,
      module: module,
      datedebut: start,
      datefin: end,
      lien: "http://localhost:3000/video/" + lien,
    }),
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
    console.log("sent");
    res.status(200).send({ message: "mail sent" });
  });
};

/**AjouterRoom */
exports.AjouterRoom = async (req, res) => {
  let a;
  let form = [];
  /**let info = {
    TitreRoom: req.body.extendedProps.TitreRoom,
    formateur: req.params.userId,
    start: req.body.start,
    end: req.body.end,
    lien: "http://localhost:3000/video/" + req.body.extendedProps.TitreRoom,
  };*/
  let planif = {
    title: req.body.title,
    description: req.body.extendedProps.description,
    TitreRoom: req.body.extendedProps.TitreRoom,
    formateur: req.params.userId,
    start: req.body.start,
    end: req.body.end,
    lien: "http://localhost:3000/video/" + req.body.extendedProps.TitreRoom,
  };
  /**console.log(req.body);
  canlender = await Calendrier.create(planif);
  canlender = await canlender.populate("formateur");
  */
  await createRoom(req.body.extendedProps.TitreRoom);
  room = await RoomMeet.create(planif);
  room = await room.populate("formateur");
  await Formations.findOne({
    Titre: req.body.title,
  }).then((result) => {
    Users.find()
      .then((item) => {
        for (formateur of item) {
          if (formateur.Role == "Etudiant") {
            for (k of formateur.formation) {
              if (k._id == result._id.toString().split(" ")[0]) {
                form.push(formateur.email);
              }
            }
            console.log(form);
            for (a of form) {
              mail(
                a,
                formateur.nom,
                formateur.prenom,
                moment(req.body.start).format("MMMM Do YYYY, h:mm:ss a"),
                moment(req.body.end).format("MMMM Do YYYY, h:mm:ss a"),
                req.body.title,
                req.body.extendedProps.description,
                req.body.extendedProps.TitreRoom
              );
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
const mailAnnulerMeet = (mail, nom, prenom, start, end, formation, module) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eya.somai134t@gmail.com",
      pass: "ewofuxjfibdffnvv",
    },
    secure: false,
  });
  const templateFile = fs.readFileSync("MailAnnulerMeet.html", "utf8");

  const templateCompiled = hogan.compile(templateFile);

  let mailOptions = {
    from: "eya.somai134t@gmail.com",
    to: mail,
    subject: "yocareer Account",
    html: templateCompiled.render({
      nom: nom,
      prenom: prenom,
      formation: formation,
      module: module,
      datedebut: start,
      datefin: end,
    }),
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
    consolelog("sent");
    res.status(200).send({ message: "mail sent" });
  });
};

//Supprimer_PlanifMeet
exports.Supprimer_PlanifMeet = async (req, res) => {
  let form = [];
  RoomMeet.findById(req.params.userId).then((event) => {
    deleteRoom(event.TitreRoom);
    Formations.findOne({
      Titre: event.title,
    }).then((result) => {
      Users.find()
        .then((item) => {
          for (formateur of item) {
            if (formateur.Role == "Etudiant") {
              for (k of formateur.formation) {
                if (k._id == result._id.toString().split(" ")[0]) {
                  form.push(formateur.email);
                }
              }
              console.log(form);
              for (a of form) {
                mailAnnulerMeet(
                  a,
                  formateur.nom,
                  formateur.prenom,
                  moment(event.start).format("MMMM Do YYYY, h:mm:ss a"),
                  moment(event.end).format("MMMM Do YYYY, h:mm:ss a"),
                  event.title,
                  event.description
                );
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  try {
    const event = await RoomMeet.findByIdAndDelete(req.params.userId);
    console.log(event, "Deleted");
    res.status(200).json({
      success: "True",
      data: event,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};

/**GetHeureDeMeetParFormateur */

exports.GetHeureDeMeetParFormateur = async (req, res) => {
  const events = await RoomMeet.find({
    formateur: req.params.userId,
    //start: { $gte: moment(req.query.start).toDate() },
    //end: { $lte: moment(req.query.end).toDate() },
    //formateur: req.body.userId,
  }).populate("formateur");

  res.send(events);
};
const getRoom = (room) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};
const deleteRoom = (room) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};
/**RejoindreRoom */

exports.RejoindreRoom = async (req, res) => {
  const roomId = req.params.userId;
  const room = await getRoom(roomId);
  res.status(200).send(room);
};

/**getFormateursRooms */

exports.getFormateursRooms = async (req, res) => {
  try {
    const rooms = await RoomMeet.find({ formateur: req.params.userId });
    res.send(rooms);
  } catch (err) {
    (err) => console.log(err);
  }
};
