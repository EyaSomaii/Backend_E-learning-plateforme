const Certification = require("../Models/Certifaction");

//Ajouter_certif

exports.Ajouter_certif = async (req, res) => {
  let info = {
    certif: `${req.protocol}://${req.get("host")}/Uploads/${
      req.files[0].filename
    }`,
    etudiant: req.params.userId,
    formation: req.params.IdFormation,
  };

  certif = await Certification.create(info);
  certif.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(certif);
    }
  });
};

//GetCertifUser
exports.GetCertifUser = async (req, res) => {
  const certif = await Certification.find({
    etudiant: req.params.userId,
    formation: req.params.IdFormation,
  });

  res.send(certif);
};

//GetCertifDetoutFormationByIdETu
exports.GetCertifDetoutFormationByIdETu = async (req, res) => {
  const certif = await Certification.find({
    etudiant: req.params.userId,
  })
    .populate("formation")
    .then((result) => {
      console.log(result);
      res.send(result);
    })

    .catch((err) => {
      console.log(err);
    });
};
//Supprimer_Certif
exports.Supprimer_Certif = async (req, res) => {
  const certif = await Certification.findByIdAndDelete(req.params.userId);

  res.send(certif);
};
