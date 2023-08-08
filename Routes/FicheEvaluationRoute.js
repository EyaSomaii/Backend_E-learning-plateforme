const express = require("express");
const router = express.Router();
const ficheController = require("../controllers/FicheEvaluationController");
router.post("/AjouterAvis/:userId/:FormationId", ficheController.AjouterAvis);
router.get(
  "/AfficherByIdEtu/:userId/:FormationId",
  ficheController.AfficherByIdEtu
);

module.exports = router;
