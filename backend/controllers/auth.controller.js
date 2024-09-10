const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const logger = require("../utils/logger");
const { generateTokens, storeRefreshToken, setCookies } = require("../utils/generateTokens");
const redis = require("../utils/redis");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ status: "error", message: "User already exists!" });
        };

        const user = await User.create({ name, email, password });

        // authenticate
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        // cookies
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            status: "success",
            message: "User signup successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        logger.error("Error Occured in signup controller:", error);
        return res.status(500).json({ status: "error", message: error.message || "Internal Server error" })
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token: ${decoded.userId}`);
        };

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.status(200).json({ status: "success", message: "Logged out successfully" })
    } catch (error) {
        logger.error("Error occured in logout controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" })
    }
};

module.exports = {
    signup, logout
};