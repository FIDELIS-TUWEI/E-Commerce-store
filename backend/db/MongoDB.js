const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

const connectDB = async () => {
    try {
        logger.info(`Connecting to MongoDB Database, please wait...`);

        const conn = await mongoose.connect(config.MONGODB_URI);
        console.log(`MongoDB Database connected successfully on: ${conn.connection.host}`);
        
    } catch (error) {
        logger.error(`Error connecting to MongoDB database: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;