const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/ModuleController");

router
  .post("/Ajoutermodule/:userId", moduleController.Ajouter_module)
  .put("/Modifiermodule/:userId", moduleController.Modifier_module)
  .delete("/Supprimermodule/:userId/:idform", moduleController.Supprimer_Module)
  .get("/Modules", moduleController.Afficher_Modules)
  .get("/chapitre/:userId", moduleController.Afficher_les_chapires_par_Module)
  .get("/module/:userId", moduleController.Afficher_Module)
  .get(
    "/FormateurParModule/:idformation/:userId",
    moduleController.Afficher_Formateur_par_Module
  )
  .get(
    "/Nombres_chap_DeChaqueFormateur/:userId",
    moduleController.Nombres_chap_DeChaqueFormateur
  )
  .get(
    "/Nombres_Deslecon_DeChaqueFormateur/:userId",
    moduleController.Nombres_Deslecon_DeChaqueFormateur
  )
  .get(
    "/GetNombreModulesAssocierAuFormateur/:userId",
    moduleController.GetNombreModulesAssocierAuFormateur
  )

  .get(
    "/Get_Les_Module_ByFormateurs/:userId",
    moduleController.Get_Les_Module_ByFormateurs
  );
module.exports = router;
