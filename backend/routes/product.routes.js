const express = require("express");
const { getAllProducts, getFeaturedProducts } = require("../controllers/product.controller");
const {protectRoute, adminRoute} = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);

module.exports = router;