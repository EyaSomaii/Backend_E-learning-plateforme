const express = require("express");
const router = express.Router();
const depotController = require("../controllers/DepotController");
const multer = require("../middleware/multer");

router
  .post("/AjouterDepot/:userId", multer, depotController.AjOuterDepot)
  .get("/GetDepots/:userId", depotController.GetDepots)
  .delete("/Retirer/:userId", depotController.Reirer_Depot);

module.exports = router;
