const express = require("express");
const router = express.Router();
const factionsController = require("../controllers/factionsController");

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
    await factionsController.getFactions(req, res);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// GET faction by slug
router.get("/:slug", async (req, res) => {
  try {
    await factionsController.getFactionBySlug(req, res);
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
    await factionsController.createFaction(req, res);
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
    await factionsController.updateFaction(req, res);
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
    await factionsController.deleteFaction(req, res);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
