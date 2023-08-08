const express = require("express");
const router = express.Router();
const ChapitreController = require("../controllers/ChapitreController");

router
  .post("/Ajouterchap/:userId", ChapitreController.Ajouter_chapitre)
  .get("/chapitre/:userId", ChapitreController.Afficher_chapitre)
  .get("/chapitres", ChapitreController.Afficher_Chapitres)
  .delete("/suppChap/:userId/:idmodule", ChapitreController.Supprimer_Chpitre)
  .put("/ModifChap/:userId", ChapitreController.Modifier_Chapitre)
  .get("/lecon/:userId", ChapitreController.Afficher_les_lecon_parChap)
  .get(
    "/AfficherChpLeconAvecIdModule/:userId",
    ChapitreController.AfficherChpLeconAvecIdModule
  );

module.exports = router;
