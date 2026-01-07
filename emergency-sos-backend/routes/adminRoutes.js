const express = require("express");
const router = express.Router();

const User = require("../models/User");
const SosEvent = require("../models/SosEvent");

// ---- USERS COUNT ----
router.get("/users/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error getting user count" });
  }
});

// ---- GET ALL USERS ----
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error getting users" });
  }
});

// ---- TOTAL SOS ALERTS ----
router.get("/sos/count", async (req, res) => {
  try {
    const count = await SosEvent.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error getting sos count" });
  }
});

// ---- ACTIVE ALERTS (optional; returns 0 if no field exists) ----
router.get("/sos/active", async (req, res) => {
  try {
    const count = await SosEvent.countDocuments({ resolved: false }).catch(() => 0);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error getting active alerts" });
  }
});

module.exports = router;
