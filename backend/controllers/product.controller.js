const Product = require("../model/product.model");
const logger = require("../utils/logger");
const redis = require("../utils/redis");
const cloudinary = require("../lib/cloudinary");

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
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        };

        const products = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        });

        res.status(201).json({ status: "success", message: "Product created successfully", products });
    } catch (error) {
        logger.error("Error occurred on createProduct controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        };

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                logger.info("Image deleted from cloudinary successfully");
            } catch (error) {
                logger.error("Error deleting image from cloudinary:", error);
            };
        };

        await Product.findByIdAndDelete(req.params.id);

        res.json({ status: "success", message: "Product deleted successfully" });
    } catch (error) {
        logger.error("Error occurred on deleteProduct controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
};

const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    image: 1
                }
            }
        ]);

        res.json(products);
    } catch (error) {
        logger.error("Error occurred on deleteProduct controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
}

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });

        res.json(products);
    } catch (error) {
        logger.error("Error occurred on getProductsByCategory controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
};

const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.isFeatured = !product.isFeatured;
            const updateProduct = await product.save();

            // update redis cache
            await updateFeaturedProductsCache();
            res.json(updateProduct);
        } else {
            res.status(404).json({ status: "error", message: "Product not found" });
        };

    } catch (error) {
        logger.error("Error occurred on toggleFeaturedProduct controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
};

async function updateFeaturedProductsCache() {
    try {
        // .lean()  method is going to return a plain javascript object instead of a mongodb document
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        logger.error("Error occurred on updateFeaturedProductsCache function:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
}

module.exports = { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, getProductsByCategory, toggleFeaturedProduct };