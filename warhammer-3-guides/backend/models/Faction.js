const mongoose = require("mongoose");

const FactionSchema = new mongoose.Schema({
  id: Number,
  name: String,
  race: String,
  description: String,
  icon_url: String,
  dlc: String,
  difficulty: String,
  slug: String,
});

module.exports = mongoose.model("Faction", FactionSchema);
