import User from "../models/User.js";

export const saveFaction = async (req, res) => {
  const { username, factionSlug } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $addToSet: { savedFactions: factionSlug } },
      { new: true }
    );
    res.json({ success: true, savedFactions: user.savedFactions });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const unsaveFaction = async (req, res) => {
  const { username, factionSlug } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $pull: { savedFactions: factionSlug } },
      { new: true }
    );
    res.json({ success: true, savedFactions: user.savedFactions });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export const signup = async (req, res) => {
  const { username, birthYear } = req.body;
  try {
    const user = new User({ username, birthYear });
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  const { username, birthYear } = req.body;
  try {
    const user = await User.findOne({ username, birthYear });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
