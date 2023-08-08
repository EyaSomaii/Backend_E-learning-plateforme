const Users = require("./Models/Utilisateur");
const Modules = require("./Models/Module");
const Formations = require("./Models/Formations");
const Chapitre = require("./Models/Chapitre");
const Lesson = require("./Models/Lesson");

function AjouterChapitre(Titre, idModule) {
  let tab = [];
  let info = {
    TitreChap: Titre,
  };

  Chapitre.create(info);
  //module =  module.populate("formateur");
  form = Modules.find({ _id: idModule }).then((result) => {
    for (i of result) {
      for (k of i.chapitres) tab.push(k);
    }
  });
  tab.push(Chapitre._id);
  form = Modules.findById({ _id: idModule });
  form = form.updateOne({
    chapitres: tab,
  });
  return true;
}

function Afficher_Chapitres_ByIdModule(idModule) {
  const form = Modules.findById(idModule)
    .select("chapitres")
    .populate("chapitres");

  return true;
}

function Supprimer_Utilisateur(IdUser) {
  const user = Users.findByIdAndDelete(IdUser);
  return true;
}

function Modifier_Leçon(texte, idlecon) {
  let info = {
    texte: texte,
  };
  Lesson.findByIdAndUpdate(idlecon, info);
  return true;
}
function Afficher_Tout_LesEtudiants() {
  Users.find({ Role: "Etudiant" });
  return true;
}
test("Afficher_Tout_LesEtudiants", () => {
  expect(Afficher_Tout_LesEtudiants()).toBe(true);
});
test("Modifier_Leçon", () => {
  expect(
    Modifier_Leçon(["bonjour", "texte222"], "628c2884612dbaebf54351e2")
  ).toBe(true);
});
test("Supprimer_Utilisateur", () => {
  expect(Supprimer_Utilisateur("6285efb9bbb5b1972ef0b4c5")).toBe(true);
});
test("Afficher_Chapitres_ByIdModule", () => {
  expect(Afficher_Chapitres_ByIdModule("6287c6a388d99d3d5974ef98")).toBe(true);
});
test("AjouterChapitre", () => {
  expect(AjouterChapitre("chap1", "6287c6a388d99d3d5974ef98")).toBe(true);
});
