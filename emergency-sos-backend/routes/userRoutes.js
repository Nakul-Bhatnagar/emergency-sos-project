const express = require("express");
const router = express.Router();

const { savePushToken } = require("../controllers/pushController");

const { protect } = require("../middleware/auth");
router.post("/push-token", protect, savePushToken);


module.exports = router;
