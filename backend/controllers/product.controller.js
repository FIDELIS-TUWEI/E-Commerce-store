const Product = require("../model/product.model");
const logger = require("../utils/logger");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({ status: "success", message: "Products fetched successfully", products });
    } catch (error) {
        logger.error("Error occurred on getAllProducts controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
};

module.exports = { getAllProducts };