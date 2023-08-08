const express = require("express");
const router = express.Router();
const userController = require("../controllers/UtilisateurController");
const multer = require("../middleware/multer");

router
  .post("/AjouterUti", multer, userController.AjouterUtilisateur)
  .patch("/ajoutCV/:userId", multer, userController.Ajouter_cv)
  .patch("/ModifierUti/:userId", multer, userController.Modifier_Utilisateur)
  .delete("/SupprimerUti/:userId", userController.Supprimer_Utilisateur)
  .post("/Login", userController.login)
  .get("/Etudiants", userController.Afficher_Etudiants)
  .get("/Formateurs", userController.Afficher_Formateurs)
  .get("/Administrateurs", userController.Afficher_Administrateurs)
  .get("/AfficherUtilisateur/:userId", userController.Afficher_ut)
  .get("/affichFormParformation", userController.Afficher_Par_Formation)
  .get(
    "/affichFormParformationparetu",
    userController.Afficher_Par_Formation_parEtudiants
  )
  .patch("/eliminerEtud/:formationId/:userId", userController.ElimnerEtudiant)
  .put("/modierMDP/:userId", userController.Modifier_mdp)
  .get(
    "/AfficherLesEtuParIDFormation/:userId",
    userController.Afficher_Les_Etu_ParID_Formation
  )
  .get("/Notmesformation/:userId", userController.Recuperer_not_mes_formations)
  .get("/mesformation/:userId", userController.Recuperer_mes_formations)
  .get(
    "/GetNombreFormationAssocierAuFormateur/:userId",
    userController.GetNombreFormationAssocierAuFormateur
  )
  .get(
    "/GetLesFormationsAvecNbrEtuDeChacune/:userId",
    userController.GetLesFormationsAvecNbrEtuDeChacune
  )
  .get(
    "/GetNombreEtuDiantAssocierAuFormateur/:userId",
    userController.GetNombreEtuDiantAssocierAuFormateur
  )
  .get("/RechercheUser/:userId", userController.RechercheUser)
  .get("/RecupererUsersChats/:userId", userController.RecupererUsersChats);

module.exports = router;
