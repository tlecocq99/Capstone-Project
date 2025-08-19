const axios = require("axios");
const Faction = require("../models/Faction");

const fetchAndStoreFactions = async () => {
  try {
    const res = await axios.get(
      "https://raw.githubusercontent.com/tlecocq99/mini-project-2/main/warhammer-3-guides/backend/data/factions.json"
    );
    const factions = res.data;

    for (const faction of factions) {
      await Faction.findOneAndUpdate({ id: faction.id }, faction, {
        upsert: true,
        new: true,
      });
    }

    console.log("Factions successfully loaded into database.");
  } catch (err) {
    console.error("Failed to fetch or store factions:", err.message);
  }
};

module.exports = fetchAndStoreFactions;
