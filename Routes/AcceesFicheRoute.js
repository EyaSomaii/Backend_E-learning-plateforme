const express = require("express");
const router = express.Router();
const AcceesFicheController = require("../controllers/AcceesFicheController");
router.post(
  "/Ajoutercertif/:userId/:IdFormation",
  AcceesFicheController.AjouterAccees
);
router.get(
  "/GetUserFicheParFormation/:userId/:IdFormation",
  AcceesFicheController.GetUserFicheParFormation
);
router.delete(
  "/SupprimerAcces/:userId/:IdFormation",
  AcceesFicheController.SupprimerAcces
);
router.patch(
  "/CacherFiche/:userId/:IdFormation",
  AcceesFicheController.CacherFiche
);

module.exports = router;
