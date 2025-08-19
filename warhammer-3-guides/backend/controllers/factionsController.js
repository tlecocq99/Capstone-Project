const Faction = require("../models/Faction");

// READ - all factions
exports.getFactions = async (req, res) => {
  try {
    const factions = await Faction.find();
    res.json(factions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - single faction by slug
exports.getFactionBySlug = async (req, res) => {
  try {
    const faction = await Faction.findOne({ slug: req.params.slug });
    if (!faction) return res.status(404).json({ error: "Faction not found" });
    res.json(faction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE - new faction
exports.createFaction = async (req, res) => {
  try {
    const faction = new Faction(req.body);
    await faction.save();
    res.status(201).json(faction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE - by slug
exports.updateFaction = async (req, res) => {
  try {
    const faction = await Faction.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!faction) return res.status(404).json({ error: "Faction not found" });
    res.json(faction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE - by slug
exports.deleteFaction = async (req, res) => {
  try {
    const faction = await Faction.findOneAndDelete({ slug: req.params.slug });
    if (!faction) return res.status(404).json({ error: "Faction not found" });
    res.json({ message: "Faction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
