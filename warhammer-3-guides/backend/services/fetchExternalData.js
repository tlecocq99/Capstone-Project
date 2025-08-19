const axios = require("axios");
const Faction = require("../models/Faction");

const fetchAndStoreFactions = async () => {
  try {
    const res = await axios.get(
      "https://raw.githubusercontent.com/tlecocq99/mini-project-2/main/warhammer-3-guides/backend/data/factions.json"
    );
    const factions = res.data;

    for (const faction of factions) {
      // Ensure all required properties are present
      const safeFaction = {
        id: faction.id,
        race: faction.race || "Unknown",
        icon_url: faction.icon_url || "",
        difficulty: faction.difficulty || "Normal",
        slug: faction.slug || "",
        faction: faction.faction || "Unknown",
        lord: faction.lord || "Unknown",
        summary: faction.summary || "",
        dlc_required: faction.dlc_required || "None",
      };
      await Faction.findOneAndUpdate({ id: safeFaction.id }, safeFaction, {
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
