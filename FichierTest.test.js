const Users = require("./Models/Utilisateur");
const Modules = require("./Models/Module");
const Formations = require("./Models/Formations");
const Chapitre = require("./Models/Chapitre");
const Lesson = require("./Models/Lesson");
const Calendrier = require("./Models/Calendrier");
const Depot = require("./Models/Depot");
const DepotEtudiant = require("./Models/DepotEtudiant");
const FicheEvaluation = require("./Models/FicheEvaluation");
const RoomMeet = require("./Models/RoomMeet");
const Message = require("./Models/Message");
const ChatRoom = require("./Models/ChatRoom");
const Forum = require("./Models/Forum");

function Retirer_salon(id) {
  RoomMeet.findOneAndDelete({
    TitreRoom: id,
  });
  return true;
}

function Récupérer_commentaires_par_module(idmodule) {
  Forum.find({ Module: idmodule })
    .populate("sender", "nom image email prenom")
    .populate("Module");

  return true;
}

function Envoyer_message(idsender, message, idChat) {
  var newMessage = {
    sender: idsender,
    content: message,
    chat: idChat,
  };

  var message = Message.create(newMessage);

  return true;
}

function Afficher_mes_chats(iduser) {
  ChatRoom.find({ users: { $elemMatch: { $eq: iduser } } });

  return true;
}

test("Retirer_salon", () => {
  expect(Retirer_salon("6295bc9631f3addf6813ac5e")).toBe(true);
});
test("Récupérer_commentaires_par_module", () => {
  expect(Récupérer_commentaires_par_module("6296b09252199c498c4a66f5")).toBe(
    true
  );
});
test("Envoyer_message", () => {
  expect(
    Envoyer_message(
      "6295bd5931f3addf6813ac72",
      "6295bc9631f3addf6813ac5e",
      "6295bdeb18ff035b5f3cc6bb"
    )
  ).toBe(true);
});
test("Afficher_mes_chats", () => {
  expect(Afficher_mes_chats("6295bd1031f3addf6813ac6e")).toBe(true);
});
