const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descritption: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    category: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;