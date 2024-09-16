const express = require("express");
const { getCartProducts, addToCart, removeAllFromCart, updateQuantity } = require("../controllers/cart.controller");
const { protectRoute } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

module.exports = router;