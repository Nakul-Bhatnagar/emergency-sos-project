const SosEvent = require("../models/SosEvent");

exports.triggerSos = async (req, res) => {
  try {
    const userId = req.user._id;

    const { latitude, longitude } = req.body || {};

    const event = await SosEvent.create({
      user: userId,
      latitude,
      longitude,
      timestamp: Date.now(),
    });

    console.log("🚨 SOS Triggered!");
    console.log("User:", userId.toString());

    if (latitude && longitude) {
      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      console.log("📍 Google Maps Location:", mapsLink);
    } else {
      console.log("📍 No location received");
    }

    return res.status(201).json({
      ok: true,
      message: "SOS Triggered",
      event,
    });

  } catch (err) {
    console.error("triggerSos error:", err);
    res.status(500).json({ message: "Failed to trigger SOS" });
  }
};



exports.getHistory = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const events = await SosEvent.find({ user: userId })
      .sort({ timestamp: -1 });

    console.log("📜 SOS History Count:", events.length);

    return res.status(200).json({
      ok: true,
      events
    });

  } catch (err) {
    console.error("❌ History fetch error:", err);
    return res.status(500).json({
      ok: false,
      message: "History fetch failed"
    });
  }
};
