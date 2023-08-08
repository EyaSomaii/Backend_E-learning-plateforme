const Chapitress = require("../Models/Chapitre");
const Modules = require("../Models/Module");
const Lecon = require("../Models/Lesson");
const DepotEtudiant = require("../Models/DepotEtudiant");

//Ajouter_Chapitre

exports.Ajouter_chapitre = async (req, res) => {
  let tab = [];
  let info = {
    TitreChap: req.body.TitreChap,
  };

  Chapitre = await Chapitress.create(info);
  //module = await module.populate("formateur");
  form = await Modules.find({ _id: req.params.userId }).then((result) => {
    for (i of result) {
      for (k of i.chapitres) tab.push(k);
    }
  });
  tab.push(Chapitre._id);
  form = Modules.findById({ _id: req.params.userId });
  form = await form.updateOne({
    chapitres: tab,
  });
  Chapitre.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(Chapitre);
    }
  });
};

//Afficher_tout_les_noms_des_chapitres
exports.Afficher_Chapitres = async (req, res) => {
  const chap = await Chapitress.find()
    .populate("lecon")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
//Afficher_chapitre_By_id
exports.Afficher_chapitre = async (req, res) => {
  const chap = await Chapitress.find({ _id: req.params.userId })
    .populate("lecon")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
//Afficher_les_lesson_par_chap

exports.Afficher_les_lecon_parChap = async (req, res) => {
  const form = await Chapitress.findById(req.params.userId)
    .select("lecon")
    .populate("lecon");

  res.send(form);
};

//Supprimer_Chapitre
const suppChapFromTabModule = async (idm, idchap) => {
  let tab = [];
  module = await Modules.findById({ _id: idm });
  for (k of module.chapitres) {
    tab.push(k.toString().split(" ")[0]);
  }

  var x = tab.indexOf(idchap);
  if (x !== -1) {
    tab.splice(x, 1);
  }
  module = await module.updateOne({
    chapitres: tab,
  });
};
exports.Supprimer_Chpitre = async (req, res) => {
  suppChapFromTabModule(req.params.idmodule, req.params.userId);
  const chapitre = await Chapitress.findById(req.params.userId);
  for (k of chapitre.lecon) {
    const anc = await Lecon.findByIdAndDelete({ _id: k });
    const dp = await DepotEtudiant.find({ lessonId: k }).then((item) => {
      for (dpE of item) {
        const ancDp = DepotEtudiant.findByIdAndDelete({ _id: dpE._id });
      }
    });
  }
  const chap = await Chapitress.findByIdAndDelete(req.params.userId);
  console.log(chap, "Deleted");
  res.status(200).json({
    success: "True",
    data: chap,
  });
};

//Modifier_chapitre
exports.Modifier_Chapitre = async (req, res) => {
  let infoo = {
    TitreChap: req.body.TitreChap,
  };
  const tache = await Chapitress.findByIdAndUpdate(req.params.userId, infoo)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//AfficherChp+LeconAvecIdModule
exports.AfficherChpLeconAvecIdModule = async (req, res) => {
  chap = [];
  rslt = [];
  const mod = await Modules.findById(req.params.userId).then((result) => {
    for (i of result.chapitres) {
      chap.push(i.toString().split(" ")[0]);
    }
  });
  for (k of chap) {
    const chaps = await Chapitress.findById({ _id: k })
      .populate("lecon")
      .then((item) => {
        rslt.push(item);
      });
  }

  res.send(rslt);
};
