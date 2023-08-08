const express = require("express");
const router = express.Router();
const depotEtuController = require("../controllers/DepotEtudiantController");
const multer = require("../middleware/multer");

router
  .post(
    "/AjouterDepot/:userId/:ModuleId/:travailId",
    multer,
    depotEtuController.AjOuterDepot
  )
  .get("/GetDepots/:userId", depotEtuController.GetMonDepotParLecon)
  .patch("/AjouterNoteDepot/:iddplecon", depotEtuController.AjouterNoteDepot)
  .get("/Getdepotetu/:userId", depotEtuController.Getdepot_etu)
  .delete("/ReirerMonDepot/:userId", depotEtuController.Reirer_MonDepot);

module.exports = router;
