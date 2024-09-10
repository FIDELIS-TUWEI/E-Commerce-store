const User = require("../model/user.model");
const { generateTokens, storeRefreshToken, setCookies } = require("../utils/generateTokens");

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
        console.error("Error Occured in signup controller:", error);
        return res.status(500).json({ status: "error", message: error.message || "Internal Server error" })
    }
}

module.exports = {
    signup
};