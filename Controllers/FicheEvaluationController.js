const FicheEvaluation = require("../Models/FicheEvaluation");
/**AjouterAvis */

exports.AjouterAvis = async (req, res) => {
  const avisetu = new FicheEvaluation(req.body);
  avisetu.Etudiant = req.params.userId;
  avisetu.formation = req.params.FormationId;

  avisetu.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(avisetu);
    }
  });
};

/**AfficherByIdEtu */

exports.AfficherByIdEtu = async (req, res) => {
  const fiche = await FicheEvaluation.findOne({
    Etudiant: req.params.userId,
    formation: req.params.FormationId,
  })
    .populate("Etudiant")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
