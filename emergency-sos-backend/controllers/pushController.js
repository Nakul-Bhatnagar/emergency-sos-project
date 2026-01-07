const User = require("../models/User");

const savePushToken = async (req, res) => {
  try {
    const userId = req.user._id;
    const { expoPushToken } = req.body;

    if (!expoPushToken) {
      return res.status(400).json({ message: "Token missing" });
    }

    await User.findByIdAndUpdate(userId, { expoPushToken });

    return res.json({ message: "Push token saved" });
  } catch (err) {
    console.error("savePushToken error", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { savePushToken };
