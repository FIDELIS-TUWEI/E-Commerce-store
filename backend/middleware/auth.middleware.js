const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const config = require("../utils/config");
const User = require("../model/user.model");

const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({ status: "error", message: "Unauthorized - No access Token provided" });
        };

        try {
            const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");
    
            if (!user) {
                return res.status(401).json({ status: "error", message: "User not found" });
            };
    
            req.user = user;
    
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ status: "error", message: "Unauthorized - Access Token Expired" });
            }
            throw error;
        }
    } catch (error) {
        logger.error("Error occured on protectRoute middleware:", error.message);
        res.status(500).json({ status: "error", message: "Unauthorized - Invalid access token" });
    }
};

const adminRoute = (req, res, next) => {
    if (req?.user.role === "admin") {
        next()
    } else {
        return res.status(403).json({ status: "error", message: "Access denied - Admin Only!" });
    }
};

module.exports = { protectRoute, adminRoute };