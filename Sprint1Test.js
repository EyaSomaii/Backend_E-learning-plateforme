const Users = require("./Models/Utilisateur");
const Modules = require("./Models/Module");
const Formations = require("./Models/Formations");
const bcrypt = require("bcrypt");
function AjouterModule(nom, formateur, idFormation) {
  let tab = [];
  let info = {
    nom: nom,
    formateur: formateur,
  };

  module = Modules.create(info);
  form = Formations.find({ _id: idFormation }).then((result) => {
    for (i of result) {
      for (k of i.Module) tab.push(k);
    }
  });
  tab.push(module._id);
  form = Formations.findById({ _id: idFormation });
  form = form.updateOne({
    Module: tab,
  });
  return true;
}
function Afficher_Formation_ByID(IdFormation) {
  const formation = Formations.findById({ _id: IdFormation });
  if (formation != null) {
    return true;
  } else {
    return false;
  }
}
function Modifier_mdp(Id, oldpassword, mot_de_passe, confirm_mdp) {
  const user = Users.findById(Id);

  if (
    bcrypt.compare(oldpassword, user.mot_de_passe) &&
    confirm_mdp == mot_de_passe
  ) {
    return true;
  } else {
    return false;
  }
}

function SeConnecter(emaile, motdepasse) {
  user = Users.findOne({ email: emaile });
  if (!user) {
    return "utilisateur non trouvé";
  }
  if (bcrypt.compare(motdepasse, user.mot_de_passe)) {
    return true;
  } else {
    return false;
  }
}
const a = "iheb@gmail.com";
const b = "iheb";
test("Login", () => {
  expect(SeConnecter(a, b)).toBe(true);
});
test("Modifier_mdp", () => {
  expect(
    Modifier_mdp("626a91a1a34f6072aab96e8e", "iheb", "iheb1", "iheb1")
  ).toBe(true);
});
test("AjouterModule", () => {
  expect(
    AjouterModule(
      "Module1",
      "626a926ca34f6072aab96e93",
      "62876a0361493a2cc0000ade"
    )
  ).toBe(true);
});
test("Afficher_Formation_ByID", () => {
  expect(Afficher_Formation_ByID("62876a0361493a2cc0000ade")).toBe(true);
});
