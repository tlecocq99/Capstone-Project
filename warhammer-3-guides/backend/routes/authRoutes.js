const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/save-faction", authController.saveFaction);
router.post("/unsave-faction", authController.unsaveFaction);

module.exports = router;
