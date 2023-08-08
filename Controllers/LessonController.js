const lesson = require("../Models/Lesson");
const Chapitres = require("../Models/Chapitre");
const Modules = require("../Models/Module");
const Etudiant = require("../Models/Utilisateur");
const Formations = require("../Models/Formations");
//SuppLçon
const suppleconFromTabchapitre = async (idchap, idLecon) => {
  let tab = [];
  chap = await Chapitres.findById({ _id: idchap });
  for (k of chap.lecon) {
    tab.push(k.toString().split(" ")[0]);
  }

  var x = tab.indexOf(idLecon);
  if (x !== -1) {
    tab.splice(x, 1);
  }
  chap = await chap.updateOne({
    lecon: tab,
  });
};
exports.SuppLcon = async (req, res) => {
  suppleconFromTabchapitre(req.params.idchap, req.params.leconId);
  try {
    const lecon = await lesson.findByIdAndDelete(req.params.leconId);
    console.log(lecon, "Deleted");
    res.status(200).json({
      success: "True",
      data: lecon,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};

//Modifier_Lecon
exports.Modifier_Lecon = async (req, res) => {
  let info = {
    titre: req.body.titre,
    texte: req.body.texte,
  };
  const newlecon = lesson
    .findByIdAndUpdate(req.params.userId, info)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
//Ajouter_Chapitre
exports.Ajouter_leçon = async (req, res) => {
  const newlecon = new lesson(req.body);
  newlecon.ChapId = req.params.userId;
  let tableçon = [];
  var tab = [];
  var tab2 = [];
  var tab3 = [];
  if (req.files) {
    for (i of req.files) {
      if (i.fieldname === "video") {
        tab.push(i.filename);
      } else if (i.fieldname === "Quiz") {
        tab2.push(i.filename);
      } else tab3.push(i.filename);
    }
    newlecon.video = tab;
    newlecon.Quiz = tab2;
    newlecon.Docs = tab3;
  }

  les = await lesson.create(newlecon);
  chap = await Chapitres.findById({ _id: req.params.userId });
  for (k of chap.lecon) tableçon.push(k);
  //console.log(tableçon);

  tableçon.push(les._id);
  //console.log(tableçon);
  chap = await chap.updateOne({
    lecon: tableçon,
  });
  //console.log(req.body);
  //console.log(newlecon);
  const savelecon = await les.save();
  res.status(200).json(savelecon);
};

//Afficher_tout_les_noms_des_chapitres
exports.afficher_lecons = async (req, res) => {
  const lec = await lesson
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
//Afficher_lecon_By_id
exports.Afficher_Lecon = async (req, res) => {
  const lec = await lesson
    .find({ _id: req.params.userId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Ajouter etudiant dans une lecon
exports.Ajouter_etud_lecon = async (req, res) => {
  let tab_etud = [];
  lec = await lesson.findById({ _id: req.body.lecon });
  for (k of lec.Etudiants) {
    tab_etud.push(k);
  }
  tab_etud.push(req.params.userId);
  lec = await lec.updateOne({
    Etudiants: tab_etud,
  });
  res.send(lec);
};
//get_My_lecon
exports.getMyLecons = async (req, res) => {
  let lecons = [];
  let lecon = [];
  const chap = await Modules.find({ _id: req.params.userId })
    .populate("chapitres")
    .then((result) => {
      for (k of result) {
        for (i of k.chapitres) {
          for (j of i.lecon) {
            lecons.push(j.toString().split(" ")[0]); // les id mtaa les lecon ta module
          }
        }
      }
    });

  for (i of lecons) {
    leco = await lesson.findById({ _id: i });
    for (etud of leco.Etudiants) {
      if (req.query.idEtud == etud.toString()) {
        lecon.push(leco);
      }
    }
  }
  res.send(lecon);
  /*for (k of module.chapitres) {
    chapitres = Chapitres.findById({ _id: k });
    console.log(chapitres);
  }*/
};

//get_My_lecon_ParFormation
exports.getMyLecons_ParFormation = async (req, res) => {
  let modu = [];
  let chapi = [];
  let mylecon = [];
  const chap = await Etudiant.find({ _id: req.params.userId })
    .populate("formation")
    .then((result) => {
      for (k of result) {
        for (i of k.formation) {
          if (i._id == req.params.idFormation) {
            for (j of i.Module) {
              modu.push(j.toString().split(" ")[0]); //IdModules
            }
          }
        }
      }
    });

  for (i of modu) {
    mod = await Modules.find({
      _id: i,
      formateur: req.query.formateur,
    }).then((result) => {
      for (z of result)
        if (z._id == req.query.module) {
          for (bd of z.chapitres) {
            chapi.push(bd.toString().split(" ")[0]);
          }
        }
      //newmodule.push(result);
    });
  }

  /**console.log(chapi);
  for (k of newmodule) {
    console.log(k);
    for (a of k.chapitres) {
      chapi.push(a.toString().split(" ")[0]);
    }
  }*/
  for (b of chapi) {
    chapitress = await Chapitres.findById({ _id: b })
      .populate("lecon")
      .then((item) => {
        for (i of item.lecon) {
          if (i.Etudiants.includes(req.params.userId)) {
            mylecon.push(i);
          }
        }
      });
  }

  res.send(mylecon);
  /*for (k of module.chapitres) {
    chapitres = Chapitres.findById({ _id: k });
    console.log(chapitres);
  }*/
};

//get_NotMy_lecon_ParFormation
exports.get_NotMy_lecon_ParFormation = async (req, res) => {
  let modu = [];
  let chapi = [];
  let mylecon = [];
  let NotLec = [];
  const chap = await Etudiant.find({ _id: req.params.userId })
    .populate("formation")
    .then((result) => {
      for (k of result) {
        for (i of k.formation) {
          if (i._id == req.params.idFormation) {
            for (j of i.Module) {
              modu.push(j.toString().split(" ")[0]);
            }
          }
        }
      }
    });

  for (i of modu) {
    mod = await Modules.find({
      _id: i,
      formateur: req.query.formateur,
    }).then((result) => {
      for (z of result) {
        if (z._id == req.query.module) {
          for (bd of z.chapitres) {
            chapi.push(bd.toString().split(" ")[0]);
          }
        }
      }
      //newmodule.push(result);
    });
  }

  /**   for (i of modu) {
    mod = await Modules.find({ _id: i, formateur: req.query.formateur });
    for (k of mod.chapitres) {
      chapi.push(k.toString().split(" ")[0]);
    }
  }*/

  for (b of chapi) {
    chapitress = await Chapitres.findById({ _id: b })
      .populate("lecon")
      .then((item) => {
        for (i of item.lecon) {
          mylecon.push(i);
        }
      });
  }

  for (f of mylecon) {
    if (!f.Etudiants.includes(req.params.userId)) {
      NotLec.push(f);
    }
  }
  res.send(NotLec);
};
//Supprimer_Acces
exports.Supprimer_Acces = async (req, res) => {
  let tab_etud = [];
  lec = await lesson.findById({ _id: req.body.lecon });
  //console.log(req.body);
  for (k of lec.Etudiants) {
    tab_etud.push(k);
  }
  var x = tab_etud.indexOf(req.params.userId);
  if (x !== -1) {
    tab_etud.splice(x, 1);
  }
  //console.log(tab_etud);
  lec = await lec.updateOne({
    Etudiants: tab_etud,
  });
  //console.log(lec);
  res.send(lec);
};
