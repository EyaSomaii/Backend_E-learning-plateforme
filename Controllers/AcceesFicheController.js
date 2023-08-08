const AcceesFiche = require("../Models/AcceesFiche");
/**AjouterAccees */

exports.AjouterAccees = async (req, res) => {
  let info = {
    ficheRempli: false,
    etudiant: req.params.userId,
    formation: req.params.IdFormation,
  };

  fiche = await AcceesFiche.create(info);
  fiche.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(fiche);
    }
  });
};
//GetUserFicheParFormation
exports.GetUserFicheParFormation = async (req, res) => {
  const fiche = await AcceesFiche.find({
    etudiant: req.params.userId,
    formation: req.params.IdFormation,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })

    .catch((err) => {
      console.log(err);
    });
};

//SupprimerAcces
exports.SupprimerAcces = async (req, res) => {
  try {
    const accesfiche = await AcceesFiche.deleteOne({
      etudiant: req.params.userId,
      formation: req.params.IdFormation,
    });
    console.log(accesfiche, "Deleted");
    res.status(200).json({
      success: "True",
      data: accesfiche,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};
//CacherFiche
exports.CacherFiche = async (req, res) => {
  let info = {
    ficheRempli: true,
  };
  const filter = {
    etudiant: req.params.userId,
    formation: req.params.IdFormation,
  };
  try {
    const accesfiche = await AcceesFiche.findOneAndUpdate(filter, info);
    console.log(accesfiche, "modified");
    res.status(200).json({
      success: "True",
      data: accesfiche,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};
