const User = require("../models/User");

exports.signup = async (req, res) => {
  const { username, birthYear } = req.body;
  try {
    const user = new User({ username, birthYear });
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
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
