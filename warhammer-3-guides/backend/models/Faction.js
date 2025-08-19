const mongoose = require("mongoose");

const FactionSchema = new mongoose.Schema({
  id: Number,
  faction: String,
  lord: String,
  race: String,
  start_position: String,
  difficulty: String,
  summary: String,
  tips: [String],
  icon_url: String,
  dlc_required: String,
  slug: String,
});

module.exports = mongoose.model("Faction", FactionSchema);
