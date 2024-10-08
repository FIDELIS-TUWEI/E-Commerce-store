const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const couponRoutes = require("./coupon.routes");
const paymentRoutes = require("./payment.routes");
const analyticsRoutes = require("./analytics.routes");

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/coupons", couponRoutes);
router.use("/payments", paymentRoutes);
router.use("/analytics", analyticsRoutes);

router.get("/favicon.ico", (req, res) => res.status(204)); // Respond with no content (status 204)

router.get("/", (req, res) => {
    res.status(200).json({ status: "success", message: "Welcome to the E-commerce-store API" });
});

router.all("*", (req, res) => {
    return res.status(404).json({ status: "error", message: `Can't find ${req.originalUrl} on the server!` });
});

module.exports = router;