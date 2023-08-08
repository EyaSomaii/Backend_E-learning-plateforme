const express = require("express");
const router = express.Router();
const RoomMeetController = require("../controllers/RoomMeetController");

router.get("/video-call/:userId", RoomMeetController.RejoindreRoom);
router.get(
  "/getFormateursRooms/:userId",
  RoomMeetController.getFormateursRooms
);
router.post("/AjouterRoom/:userId", RoomMeetController.AjouterRoom);
router.get(
  "/GetHeureDeMeetParFormateur/:userId",
  RoomMeetController.GetHeureDeMeetParFormateur
);
router.delete(
  "/SuppPlanifMeet/:userId",
  RoomMeetController.Supprimer_PlanifMeet
);

module.exports = router;
