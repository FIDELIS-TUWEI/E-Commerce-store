const express = require("express");
const { protectRoute, adminRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protectRoute, adminRoute);

module.exports = router;