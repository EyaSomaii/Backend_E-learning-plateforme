const DepotEtudiant = require("../Models/DepotEtudiant");
const lesson = require("../Models/Lesson");

/**AjOuterDepot */

exports.AjOuterDepot = async (req, res) => {
  const now = new Date();

  let info = {
    IDetu: req.params.userId,
    DateRemise:
      now.toISOString().slice(0, 10) +
      " " +
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes(),
    lessonId: req.body.lessonId,
    ModuleId: req.params.ModuleId,
    travailId: req.params.travailId,
    Docs: `${req.protocol}://${req.get("host")}/Uploads/${
      req.files[0].filename
    }`,
  };

  depotEtudiant = await DepotEtudiant.create(info);

  depotEtudiant.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(depotEtudiant);
    }
  });
};

/**GetMonDepotParLecon */

exports.GetMonDepotParLecon = async (req, res) => {
  const Depots = await DepotEtudiant.find({
    IDetu: req.params.userId,
    lessonId: req.query.lessonId,
  }).populate("travailId");

  res.send(Depots);
};
/**Getdepot_etu */

exports.Getdepot_etu = async (req, res) => {
  const Depots = await DepotEtudiant.find({
    IDetu: req.params.userId,
    ModuleId: req.query.ModuleId,
  })
    .populate("lessonId")
    .populate("travailId");

  console.log(Depots);
  res.send(Depots);
};
//Reirer_MonDepot
exports.Reirer_MonDepot = async (req, res) => {
  try {
    const dp = await DepotEtudiant.findByIdAndDelete(req.params.userId);
    console.log(dp, "Deleted");
    res.status(200).json({
      success: "True",
      data: dp,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};

//AjouterNoteDepot
exports.AjouterNoteDepot = async (req, res) => {
  let infoo = {
    Note: req.body.Note,
  };
  const depotEtuController = await DepotEtudiant.findByIdAndUpdate(
    req.params.iddplecon,
    infoo
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
