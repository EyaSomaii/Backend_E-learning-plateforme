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

function Supprimer_dépôt_de_travail(id) {
  DepotEtudiant.findByIdAndDelete(id);
  return true;
}

function Planifier_reunion_instantanée(
  titreRoom,
  idFormateur,
  dateDebut,
  datefin,
  description,
  titre
) {
  let info = {
    TitreRoom: titreRoom,
    formateur: idFormateur,
    start: dateDebut,
    end: datefin,
    lien: "http://localhost:3000/video/" + titreRoom,
  };
  let planif = {
    title: titre,
    description: description,
    TitreRoom: titreRoom,
    formateur: idFormateur,
    start: dateDebut,
    end: datefin,
    lien: "http://localhost:3000/video/" + titreRoom,
  };
  canlender = Calendrier.create(planif);

  //createRoom(titreRoom);
  room = RoomMeet.create(info);

  return true;
}

function Afficher_liste_leçons_non_accessibles(
  idetudiant,
  idformation,
  idformateur,
  idModule
) {
  let modu = [];
  let chapi = [];
  let mylecon = [];
  let NotLec = [];
  const chap = Users.find({ _id: idetudiant })
    .populate("formation")
    .then((result) => {
      for (k of result) {
        for (i of k.formation) {
          if (i._id == idformation) {
            for (j of i.Module) {
              modu.push(j.toString().split(" ")[0]);
            }
          }
        }
      }
    });
  for (i of modu) {
    mod = Modules.find({
      _id: i,
      formateur: idformateur,
    });
    for (z of mod)
      if (z._id == idModule) {
        for (bd of z.chapitres) {
          chapi.push(bd.toString().split(" ")[0]);
        }
      }
  }
  for (b of chapi) {
    chapitress = Chapitres.findById({ _id: b });

    for (i of chapitress.lecon) {
      mylecon.push(i);
    }
  }
  for (f of mylecon) {
    console.log(!f.Etudiants.includes(req.params.userId));

    if (!f.Etudiants.includes(req.params.userId)) {
      NotLec.push(f);
    }
  }
  return true;
}

function Consulter_fiche_évaluation(idEtu, IdFormation) {
  FicheEvaluation.findOne({
    Etudiant: idEtu,
    formation: IdFormation,
  });

  return true;
}

test("Supprimer_dépôt_de_travail", () => {
  expect(
    Supprimer_dépôt_de_travail(
      "rm1",
      "6295bc9631f3addf6813ac5e",
      "23/02/2000",
      "23/02/2000",
      "ee",
      "kk"
    )
  ).toBe(true);
});
test("Planifier_reunion_instantanée", () => {
  expect(
    Planifier_reunion_instantanée(
      "6296b09252199c498c4a66f5",
      "6295bd5931f3addf6813ac72"
    )
  ).toBe(true);
});
test("Afficher_liste_leçons_non_accessibles", () => {
  expect(
    Afficher_liste_leçons_non_accessibles(
      "6295bd5931f3addf6813ac72",
      "6295bc9631f3addf6813ac5e",
      "6295bdeb18ff035b5f3cc6bb",
      "6295be3b18ff035b5f3cc6dd"
    )
  ).toBe(true);
});
test("Consulter_fiche_évaluation", () => {
  expect(
    Consulter_fiche_évaluation(
      "6295bd1031f3addf6813ac6e",
      "6295bc9631f3addf6813ac5e"
    )
  ).toBe(true);
});
