const Coupon = require("../model/coupon.model");
const logger = require("../utils/logger");

const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
        res.json(coupon || null);
    } catch (error) {
        logger.error("Error Occured on getCoupon controller:", error.message);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
};

const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

        if (!coupon) {
            return res.status(404).json({ status: "error", message: "Coupon not found" });
        };

        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({ status: "error", message: "Coupon Expired" });
        };
        
        res.json({
            status: "success",
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        });
        
    } catch (error) {
        logger.error("Error Occured on validateCoupon controller:", error.message);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
}

module.exports = { getCoupon, validateCoupon };