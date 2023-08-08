const express = require("express");
const router = express.Router();
const CalendrierController = require("../controllers/CalendrierController");

router
  .post("/AjouterDate/:userId", CalendrierController.AjuterHeureDeTravail)
  .get("/AfficherDate", CalendrierController.AffHeureDeTravailParFormateur)
  .get(
    "/AfficherDateparformateur/:userId",
    CalendrierController.AffHeureDeTravailParFormateurId
  )
  .delete("/SuppEvent/:userId", CalendrierController.SuppEvent);

module.exports = router;
