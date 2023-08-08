const Formations = require("../Models/Formations");
const Modules = require("../Models/Module");
const Lecons = require("../Models/Lesson");
const Chapitres = require("../Models/Chapitre");
const Certifaction = require("../Models/Certifaction");
const Users = require("../Models/Utilisateur");

//Ajouter_Formation

exports.Ajouter_formation = async (req, res) => {
  let info = {
    Titre: req.body.Titre,
    description_courte: req.body.description_courte,
    Ce_que_vous_apprendez: req.body.Ce_que_vous_apprendez,
    Prerequis: req.body.Prerequis,
    description: req.body.description,
    video: "http://localhost:3001/Uploads/" + req.body.video,
    poster: "http://localhost:3001/Uploads/" + req.body.poster,
  };
  formation = await Formations.create(info);
  formation.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(formation);
    }
  });
};

//Modifier_Formation

exports.Modifier_formation = async (req, res) => {
  let newformation = {
    Titre: req.body.Titre,
    description_courte: req.body.description_courte,
    Ce_que_vous_apprendez: req.body.Ce_que_vous_apprendez,
    Prerequis: req.body.Prerequis,
    description: req.body.description,
  };
  let newformation2 = {
    Titre: req.body.Titre,
    description_courte: req.body.description_courte,
    Ce_que_vous_apprendez: req.body.Ce_que_vous_apprendez,
    Prerequis: req.body.Prerequis,
    description: req.body.description,

    poster: "http://localhost:3001/Uploads/" + req.body.poster,
  };
  let newformation3 = {
    Titre: req.body.Titre,
    description_courte: req.body.description_courte,
    Ce_que_vous_apprendez: req.body.Ce_que_vous_apprendez,
    Prerequis: req.body.Prerequis,
    description: req.body.description,
    video: "http://localhost:3001/Uploads/" + req.body.video,
  };
  let newformation4 = {
    Titre: req.body.Titre,
    description_courte: req.body.description_courte,
    Ce_que_vous_apprendez: req.body.Ce_que_vous_apprendez,
    Prerequis: req.body.Prerequis,
    description: req.body.description,
    poster: "http://localhost:3001/Uploads/" + req.body.poster,
    video: "http://localhost:3001/Uploads/" + req.body.video,
  };
  if (req.body.video == null && req.body.poster == null) {
    const formation = await Formations.findByIdAndUpdate(
      req.params.userId,
      newformation
    )

      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.body.video == null && req.body.poster !== null) {
    const formation = await Formations.findByIdAndUpdate(
      req.params.userId,
      newformation2
    )

      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.body.video !== null && req.body.poster == null) {
    const formation = await Formations.findByIdAndUpdate(
      req.params.userId,
      newformation3
    )

      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.body.video !== null && req.body.poster !== null) {
    const formation = await Formations.findByIdAndUpdate(
      req.params.userId,
      newformation4
    )

      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //console.log(newformation);
};

exports.Supprimer_Formation = async (req, res) => {
  let modul = [];
  let chap = [];
  let lecon = [];
  //let test = false;
  form = await Formations.findById({ _id: req.params.userId });
  for (z of form.Module) {
    modul.push(z.toString().split(" ")[0]);
    module = await Modules.findById({ _id: z });
    for (v of module.chapitres) {
      chap.push(v.toString().split(" ")[0]);
      chapitr = await Chapitres.findById({ _id: v });
      for (x of chapitr.lecon) {
        lecon.push(x.toString().split(" ")[0]);
      }
    }
  }
  for (idModule of modul) {
    const ancm = await Modules.findByIdAndDelete({ _id: idModule });
  }
  for (idchap of chap) {
    const anc = await Chapitres.findByIdAndDelete({ _id: idchap });
  }
  for (idlec of lecon) {
    const ancl = await Lecons.findByIdAndDelete({ _id: idlec });
  }
  const formation = await Formations.findByIdAndDelete(req.params.userId);

  res.status(200).json({
    success: "True",
    data: formation,
  });
};

//Afficher_Formation

exports.Afficher_Formation = async (req, res) => {
  const formation = await Formations.findById({ _id: req.params.userId })
    .then((result) => {
      console.log(result);
      res.send(result);
    })

    .catch((err) => {
      console.log(err);
    });
};

//Afficher_Formations

exports.Afficher_Formations = async (req, res) => {
  const formation = await Formations.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Afficher_les_modules_par_formations

exports.Afficher_les_modules_par_formations = async (req, res) => {
  const form = await Formations.findById(req.params.userId)
    .select("Module")
    .populate("Module");

  res.send(form);
};

//GetLesFormationsAvecNbrEtuDeChacune
exports.GetLesFormationsAvecNbrEtuDeChacune = async (req, res) => {
  let form = [];
  let formEtu = [];
  let i = 0;
  let info = [];
  const formateurs = await Formations.find().then((result) => {
    for (k of result) {
      form.push({ id: k._id, name: k.Titre });
    }
    console.log(form);
    const Etus = Users.find({ Role: "Etudiant" }).then((item) => {
      for (x of item) {
        for (f of x.formation) {
          formEtu.push(f.toString().split(" ")[0]);
        }
      }
      for (z of form) {
        for (a of formEtu) {
          if (z.id == a) {
            i++;
          }
        }

        info.push({ name: z.name, Nbr_Etudiants: i });
        i = 0;
      }
      console.log(info);
      res.send(info);
    });
  });
};

//GetLesFormationsAvecNbrFormDeChacune
exports.GetLesFormationsAvecNbrFormDeChacune = async (req, res) => {
  let form = [];
  let formEtu = [];
  let i = 0;
  let info = [];
  const formateurs = await Formations.find().then((result) => {
    for (k of result) {
      form.push({ id: k._id, name: k.Titre });
    }
    console.log(form);
    const Etus = Users.find({ Role: "Formateur" }).then((item) => {
      for (x of item) {
        for (f of x.formation) {
          formEtu.push(f.toString().split(" ")[0]);
        }
      }
      for (z of form) {
        for (a of formEtu) {
          if (z.id == a) {
            i++;
          }
        }

        info.push({ name: z.name, value: i });
        i = 0;
      }
      console.log(info);
      res.send(info);
    });
  });
};
