const express = require("express");
const { getAllProducts } = require("../controllers/product.controller");
const {protectRoute, adminRoute} = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);

module.exports = router;