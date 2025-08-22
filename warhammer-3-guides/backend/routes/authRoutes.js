import express from "express";
import {
  signup,
  login,
  saveFaction,
  unsaveFaction,
  getUser,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/save-faction", saveFaction);
router.post("/unsave-faction", unsaveFaction);
router.get("/user/:username", getUser);
export default router;
