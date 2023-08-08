const Depot = require("../Models/Depot");
const lesson = require("../Models/Lesson");

/**AjOuterDepot */

exports.AjOuterDepot = async (req, res) => {
  let tabdepot = [];

  let info = {
    Titre: req.body.Titre,
    Datedebut: req.body.Datedebut,
    Datefin: req.body.Datefin,
    Docs: `${req.protocol}://${req.get("host")}/Uploads/${
      req.files[0].filename
    }`,
    lessonId: req.params.userId,
  };
  depot = await Depot.create(info);
  lessons = await lesson.findById({ _id: req.params.userId });
  for (k of lessons.Depots) {
    tabdepot.push(k);
  }

  tabdepot.push(depot._id);
  lessons = await lessons.updateOne({
    Depots: tabdepot,
  });
  //console.log(newlecon);
  const savep = await depot.save();
  res.status(200).json(savep);
};

/**GetDepots */

exports.GetDepots = async (req, res) => {
  const Depots = await Depot.find({ lessonId: req.params.userId });
  res.send(Depots);
};
//Reirer_Depot
exports.Reirer_Depot = async (req, res) => {
  try {
    const dp = await Depot.findByIdAndDelete(req.params.userId);
    console.log(dp, "Deleted");
    res.status(200).json({
      success: "True",
      data: dp,
    });
  } catch (err) {
    (err) => console.log(err);
  }
};
