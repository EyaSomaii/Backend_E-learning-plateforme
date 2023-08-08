const express = require("express");
const router = express.Router();
const formationController = require("../controllers/FormationController");
const multer = require("../middleware/multer");

router
  .post("/Ajouterform", multer, formationController.Ajouter_formation)
  .put("/Modifierform/:userId", formationController.Modifier_formation)
  .delete("/Supprimerform/:userId", formationController.Supprimer_Formation)
  .get("/formation/:userId", formationController.Afficher_Formation)
  .get(
    "/GetLesFormationsAvecNbrEtuDeChacune",
    formationController.GetLesFormationsAvecNbrEtuDeChacune
  )

  .get("/Formations", formationController.Afficher_Formations)
  .get(
    "/GetLesFormationsAvecNbrFormDeChacune",
    formationController.GetLesFormationsAvecNbrFormDeChacune
  )

  .get(
    "/Module_par_formation/:userId",
    formationController.Afficher_les_modules_par_formations
  );

module.exports = router;
