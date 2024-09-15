const express = require("express");
const { getAllProducts, getFeaturedProducts, createProduct, deleteProduct } = require("../controllers/product.controller");
const {protectRoute, adminRoute} = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

module.exports = router;