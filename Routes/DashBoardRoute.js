const express = require("express");
const router = express.Router();
const DashBoardController = require("../controllers/DashBoardController");

router.get("/NombreDesFormateurs", DashBoardController.NombreDesFormateurs);
router.get("/NombresDesEtudiants", DashBoardController.NombresDesEtudiants);
router.get("/NombreDesModules", DashBoardController.NombreDesModules);
router.get("/NombresDesChapitres", DashBoardController.NombresDesChapitres);
router.get("/NombresDesLecon", DashBoardController.NombresDesLecon);
router.get("/ToTalPrix", DashBoardController.ToTalPrix);
router.get(
  "/ToTalPrixdeChaqurFormation",
  DashBoardController.ToTalPrixdeChaqurFormation
);

module.exports = router;
