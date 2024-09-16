const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware");
const { getCoupon, validateCoupon } = require("../controllers/coupon.controller");

const router = express.Router();

router.get("/", protectRoute, getCoupon);
router.get("/validate", protectRoute, validateCoupon);

module.exports = router;