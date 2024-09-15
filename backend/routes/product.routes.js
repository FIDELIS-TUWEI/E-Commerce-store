const express = require("express");
const { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts } = require("../controllers/product.controller");
const {protectRoute, adminRoute} = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

module.exports = router;