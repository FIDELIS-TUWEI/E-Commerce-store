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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ status: "error", message: "Invalid email or password" });
        };   
        
        const isPasswordValid = await user.comparePassword(password)

        if (isPasswordValid) {
            const { accessToken, refreshToken } = generateTokens(user._id);

            await storeRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);

            res.status(200).json({
                status: "success",
                message: "Logged in successfully",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            res.status(401).json({ status: "error", message: "Invalid email or password" });
        }
    } catch (error) {
        logger.error("Error occured on login controller:", error);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" })
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

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            res.status(401).json({ status: "error", message: "No refresh token provided" });
        };

        const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token: ${decoded.userId}`);

        if (storedToken !== refreshToken) {
            return res.status(401).json({ status: "error", message: "Invalid refresh token" })
        };

        const accessToken = jwt.sign({ userId: decoded.userId }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({
            status: "success",
            message: "Token refreshed successfully",
        })
    } catch (error) {
        logger.error("Error occured on refreshToken controller:", error);
        res.stayus(500).json({ status: "error", message: error.message || "Internal Server Error" })
    }
};

const getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        logger.error("Error occured on getProfile controller:", error);
        res.stayus(500).json({ status: "error", message: error.message || "Internal Server Error" })
    }
}

module.exports = {
    signup, login, logout, refreshToken, getProfile
};