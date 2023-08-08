const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("morgan");

const app = express();
const apiPort = 3001;
const userroute = require("./Routes/UtilisateurRoute");
const fromationroute = require("./Routes/FormationRoute");
const chapitreRoute = require("./Routes/ChapitreRoute");
const moduleroute = require("./Routes/ModuleRoute");
const leçonroute = require("./Routes/leçonRoute");
const CalendrierRoute = require("./Routes/CalendrierRoute");
const DepotRoute = require("./Routes/DepotRoute");
const DepotETURoute = require("./Routes/DepotEtudiantRoute");
const FicheEvaluationRoute = require("./Routes/FicheEvaluationRoute");
const CertificationRoute = require("./Routes/CertificationRoute");
const AcceesFicheRoute = require("./Routes/AcceesFicheRoute");
const DashBoardRoute = require("./Routes/DashBoardRoute");
const RoomMeetRoute = require("./Routes/RoomMeetRoute");
const ChatRoomRoute = require("./Routes/ChatRoomRoute");
const MessageRoute = require("./Routes/MessageRoute");
const ForumRoute = require("./Routes/ForumRoute");

const path = require("path");
var cors = require("cors");
const multer = require("multer");
const Users = require("./Models/Utilisateur");
const GridFsStorage = require("multer-gridfs-storage");
//const bp = require("body-parser");
//app.use(bp.json());

app.use(cors());

app.use(express.json({ extended: false }));
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file", "Docs", "Quiz"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.post("/api/video", upload.any(), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.use(logger("dev"));
app.use(express.json());

app.use("/User", userroute);
app.use("/Formation", fromationroute);
app.use("/lecon", leçonroute);
app.use("/Module", moduleroute);
app.use("/Chapitre", chapitreRoute);
app.use("/Calendrier", CalendrierRoute);
app.use("/Depot", DepotRoute);
app.use("/DepotETU", DepotETURoute);
app.use("/FicheEvaluationRoute", FicheEvaluationRoute);
app.use("/CertificationRoute", CertificationRoute);
app.use("/AcceesFicheRoute", AcceesFicheRoute);
app.use("/DashBoardRoute", DashBoardRoute);
app.use("/RoomMeetRoute", RoomMeetRoute);
app.use("/ChatRoomRoute", ChatRoomRoute);
app.use("/MessageRoute", MessageRoute);
app.use("/ForumRoute", ForumRoute);

mongoose
  .connect(
    "mongodb+srv://admin:****@cluster0.ksah9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const server = app.listen(apiPort, () =>
  console.log(`Server running on port ${apiPort}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (idUser) => {
    socket.join(idUser);
    socket.emit("connected");
  });
  let idModule;
  socket.on("join Forum", (ModuleRoomID) => {
    socket.join(ModuleRoomID);
    idModule = ModuleRoomID;
    console.log("User Joined ModuleRoomID: " + ModuleRoomID);
  });
  socket.on("new comment", (newComment) => {
    socket.broadcast.to(idModule).emit("comment recieved", newComment);
  });
  /**----------------Chat-------------- */
  let idrrom;
  socket.on("join chat", (ChatRoomId) => {
    socket.join(ChatRoomId);
    idrrom = ChatRoomId;
    console.log("User Joined ChatRoomId: " + ChatRoomId);
  });
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    // if (!chat.users) return console.log("chat.users not defined");
    socket.broadcast.to(idrrom).emit("message recieved", newMessageRecieved);
    /**chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      //socket.in(user._id).emit("message recieved", newMessageRecieved);
      socket.broadcast.to(idrrom).emit("message recieved", newMessageRecieved);
    });*/
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(idUser);
  });
});
