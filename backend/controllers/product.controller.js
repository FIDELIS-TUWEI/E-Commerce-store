const Product = require("../model/product.model");
const logger = require("../utils/logger");
const redis = require("../utils/redis");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({ status: "success", message: "Products fetched successfully", products });
    } catch (error) {
        logger.error("Error occurred on getAllProducts controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts))
        };

        // if not in redis fetch from mongodb
        // .lean()  method is going to return a plain javascript object instead of a mongodb document
        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ status: "error", message: "No featured products found" });
        };

        // store in redis for future quick access
        await redis.set("featured_products", JSON.stringify(featuredProducts));

        res.json(featuredProducts);
    } catch (error) {
        logger.error("Error occurred on getFeaturedProducts controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
}

module.exports = { getAllProducts, getFeaturedProducts };