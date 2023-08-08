const express = require("express");
const router = express.Router();
const CertifactionController = require("../controllers/CertificationContoller");
const multer = require("../middleware/multer");
router.post(
  "/Ajoutercertif/:userId/:IdFormation",
  multer,
  CertifactionController.Ajouter_certif
);
router.get(
  "/GetCertifUser/:userId/:IdFormation",
  CertifactionController.GetCertifUser
);
router.get(
  "/GetCertifDetoutFormationByIdETu/:userId",
  CertifactionController.GetCertifDetoutFormationByIdETu
);
router.delete(
  "/Supprimer_Certif/:userId",
  CertifactionController.Supprimer_Certif
);

module.exports = router;
