const Users = require("./Models/Utilisateur");
const Modules = require("./Models/Module");
const Formations = require("./Models/Formations");
const Chapitre = require("./Models/Chapitre");
const Lesson = require("./Models/Lesson");
const Calendrier = require("./Models/Calendrier");
const Depot = require("./Models/Depot");

function Ajouter_seance_deTravail(title, Idformateur, start, end) {
  let info = {
    title: title,
    formateur: Idformateur,
    start: start,
    end: end,
  };
  Calendrier.create(info);
  return true;
}

function Ajouter_Travail_A_faire(title, idLecon, start, end) {
  let tabdepot = [];

  let info = {
    Titre: title,
    Datedebut: start,
    Datefin: end,
    lessonId: idLecon,
  };
  depot = Depot.create(info);

  return true;
}

function Supprimer_Travail_A_faire(iddp) {
  const dp = Depot.findByIdAndDelete(iddp);
  return true;
}

function Afficher_Seances_Par_Formateur(idFormateur) {
  const events = Calendrier.find({
    formateur: idFormateur,
  });
  return true;
}
function Afficher_Tout_Travail_a_faire_Par_Leçon(idlecon) {
  const Depots = Depot.find({ lessonId: idlecon });
  return true;
}

test("Ajouter_seance_deTravail", () => {
  expect(
    Ajouter_seance_deTravail(
      "seance1",
      "626a92d7a34f6072aab96e99",
      "2022-05-18T11:28:25.890+00:00",
      "2022-05-19T11:28:25.890+00:00"
    )
  ).toBe(true);
});
test("Ajouter_Travail_A_faire", () => {
  expect(
    Ajouter_Travail_A_faire(
      "seance1",
      "628c2884612dbaebf54351e2",
      "2022-05-18T11:28:25.890+00:00",
      "2022-05-19T11:28:25.890+00:00"
    )
  ).toBe(true);
});
test("Supprimer_Travail_A_faire", () => {
  expect(Supprimer_Travail_A_faire("626ead2c0887c7edada0c483")).toBe(true);
});
test("Afficher_Seances_Par_Formateur", () => {
  expect(Afficher_Seances_Par_Formateur("626a92d7a34f6072aab96e99")).toBe(true);
});
test("Afficher_Tout_Travail_a_faire_Par_Leçon", () => {
  expect(
    Afficher_Tout_Travail_a_faire_Par_Leçon("628c2884612dbaebf54351e2")
  ).toBe(true);
});
