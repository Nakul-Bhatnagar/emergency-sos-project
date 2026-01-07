// backend/routes/sosRoutes.js
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const { triggerSos, getHistory } = require("../controllers/sosController");

// Trigger SOS
router.post("/trigger", protect, triggerSos);

// Get SOS History
router.get("/history", protect, getHistory);

module.exports = router;
