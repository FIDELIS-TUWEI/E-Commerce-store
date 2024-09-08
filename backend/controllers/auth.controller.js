const User = require("../model/user.model");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ status: "error", message: "User already exists!" });
        };

        const user = await User.create({ name, email, password });

        res.status(201).json({
            status: "success",
            message: "User signup successful",
            data: {
                name: user.name,
                email: user.email
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