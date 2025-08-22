import express from "express";
import {
  signup,
  login,
  saveFaction,
  unsaveFaction,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/save-faction", saveFaction);
router.post("/unsave-faction", unsaveFaction);
export default router;
