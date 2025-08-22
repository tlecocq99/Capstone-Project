import express from "express";
import {
  getFactions,
  getFactionBySlug,
  createFaction,
  updateFaction,
  deleteFaction,
} from "../controllers/factionsController.js";
const router = express.Router();

/**
 * @swagger
 * /api/factions:
 *   get:
 *     summary: Get all factions
 *     responses:
 *       200:
 *         description: List of factions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faction'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/factions/{slug}:
 *   get:
 *     summary: Get a faction by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single faction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faction'
 *       404:
 *         description: Faction not found
 */

// GET all factions
router.get("/", async (req, res) => {
  try {
    await getFactions(req, res);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// GET faction by slug
router.get("/:slug", async (req, res) => {
  try {
    await getFactionBySlug(req, res);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

/**
 * @swagger
 * /api/factions:
 *   post:
 *     summary: Create a new faction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Faction'
 *     responses:
 *       201:
 *         description: Faction created
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    await createFaction(req, res);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

/**
 * @swagger
 * /api/factions/{slug}:
 *   put:
 *     summary: Update a faction by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Faction'
 *     responses:
 *       200:
 *         description: Faction updated
 *       500:
 *         description: Server error
 */
router.put("/:slug", async (req, res) => {
  try {
    await updateFaction(req, res);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

/**
 * @swagger
 * /api/factions/{slug}:
 *   delete:
 *     summary: Delete a faction by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Faction deleted
 *       500:
 *         description: Server error
 */
router.delete("/:slug", async (req, res) => {
  try {
    await deleteFaction(req, res);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
export default router;
