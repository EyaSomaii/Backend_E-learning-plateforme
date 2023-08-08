const express = require("express");
const router = express.Router();
const leçonController = require("../controllers/LessonController");
const multerr = require("../middleware/multer");
//const multer = require("../middleware/multer-video");
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/pdf": "pdf",
  "video/mp4 ": "mp4",
  "video/webm": "webm",
  "video/ogg": "webm",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "Uploads");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
let multerWithFields = multer({ storage: storage }).any([]);

router.post(
  "/AjoutLecon/:userId",
  multerWithFields,
  leçonController.Ajouter_leçon
);
router.post("/Upload", multerr);
router.get("/lecons", leçonController.afficher_lecons);
router.get("/AffleconById/:userId", leçonController.Afficher_Lecon);
router.post("/AjoutEtu/:userId", leçonController.Ajouter_etud_lecon);
router.get("/getMyLecon/:userId", leçonController.getMyLecons);
router.delete("/supplecon/:leconId/:idchap", leçonController.SuppLcon);

router.get(
  "/MyLecons_Formation/:userId/:idFormation",
  leçonController.getMyLecons_ParFormation
);
router.get(
  "/NotMyLecons_Formation/:userId/:idFormation",
  leçonController.get_NotMy_lecon_ParFormation
);
router.patch("/modifierlecon/:userId", leçonController.Modifier_Lecon);

router.patch("/SuppAcces/:userId", leçonController.Supprimer_Acces);

module.exports = router;
