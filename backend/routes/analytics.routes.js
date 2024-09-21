const express = require("express");
const { protectRoute, adminRoute } = require("../middleware/auth.middleware");
const { analytics } = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/", protectRoute, adminRoute, analytics);

module.exports = router;